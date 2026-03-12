import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import validateEnv from '@utils/validateEnv';
import { UserController } from './controllers/user.controller';
import { HealthController } from './controllers/health.controller';
import { ConversationController } from './controllers/conversation.controller';
import { SpaceController } from './controllers/space.controller';
import { FileController } from './controllers/file.controller';
import { AssistantController } from './controllers/assistant.controller';
import { IconController } from './controllers/icon.controller';

validateEnv();

const app = new App([
  IndexController,
  UserController,
  HealthController,
  ConversationController,
  SpaceController,
  FileController,
  AssistantController,
  IconController,
]);

app.listen();
