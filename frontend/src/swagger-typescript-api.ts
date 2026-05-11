import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

const execAsync = promisify(exec);
const PATH_TO_OUTPUT_DIR = path.resolve(process.cwd(), './src/data-contracts/backend');
const PATH_TO_TEMP_DIR = path.resolve(process.cwd(), './src/data-contracts/.tmp');
const TEMP_SWAGGER_PATH = path.join(PATH_TO_TEMP_DIR, 'backend.swagger.json');
const BACKEND_SWAGGER_URL = process.env.BACKEND_SWAGGER_URL ?? 'http://localhost:3001/api/swagger.json';

const logCommandOutput = (stdout: string, stderr: string) => {
  if (stderr) {
    console.log(`stderr: ${stderr}`);
  }

  if (stdout) {
    console.log(`Data-contract-generator: ${stdout}`);
  }
};

const runCommand = async (command: string) => {
  const { stdout, stderr } = await execAsync(command);
  logCommandOutput(stdout, stderr);
};

const stripUnsupportedNotSchemas = (value: JsonValue): JsonValue => {
  if (Array.isArray(value)) {
    return value.map(stripUnsupportedNotSchemas);
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  const output: Record<string, JsonValue> = {};

  Object.entries(value).forEach(([key, childValue]) => {
    // swagger-typescript-api fails when parsing OpenAPI schemas that include `not`.
    if (key === 'not') {
      return;
    }

    output[key] = stripUnsupportedNotSchemas(childValue as JsonValue);
  });

  return output;
};

const downloadAndSanitizeSwagger = async () => {
  const response = await fetch(BACKEND_SWAGGER_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch backend swagger from ${BACKEND_SWAGGER_URL}. Status: ${response.status}`);
  }

  const swaggerJson = (await response.json()) as JsonValue;
  const sanitizedSwagger = stripUnsupportedNotSchemas(swaggerJson);
  fs.writeFileSync(TEMP_SWAGGER_PATH, JSON.stringify(sanitizedSwagger, null, 2), 'utf-8');
};

const main = async () => {
  console.log(`Generating frontend backend contracts from ${BACKEND_SWAGGER_URL}`);
  fs.mkdirSync(PATH_TO_OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(PATH_TO_TEMP_DIR, { recursive: true });

  try {
    await downloadAndSanitizeSwagger();
    await runCommand(
      `npx swagger-typescript-api generate --modular -p "${TEMP_SWAGGER_PATH}" -o "${PATH_TO_OUTPUT_DIR}" --no-client --clean-output --extract-enums`,
    );
  } finally {
    fs.rmSync(TEMP_SWAGGER_PATH, { force: true });
    fs.rmSync(PATH_TO_TEMP_DIR, { recursive: true, force: true });
  }
};

main();
