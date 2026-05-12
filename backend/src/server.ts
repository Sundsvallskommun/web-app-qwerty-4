import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import validateEnv from '@utils/validateEnv';
import { UserController } from './controllers/user.controller';
import { HealthController } from './controllers/health.controller';
import { ConversationController } from './controllers/conversation.controller';
import { SpaceController } from './controllers/space.controller';
import { FileController } from './controllers/file.controller';
import { PinnedAssistantsController } from './controllers/pinned-assistants.controller';
import { AssistantController } from './controllers/assistant.controller';
import { IconController } from './controllers/icon.controller';
import { AzureController } from './controllers/azure.controller';
import { UserSpaceSettingsController } from './controllers/user-space-settings.controller';

validateEnv();

const app = new App([
  IndexController,
  UserController,
  HealthController,
  ConversationController,
  SpaceController,
  FileController,
  PinnedAssistantsController,
  UserSpaceSettingsController,
  AssistantController,
  IconController,
  AzureController,
]);

app.listen();
