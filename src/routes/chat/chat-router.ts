import { Router } from 'express';
import { chatController } from './chat-controller';

export const indexRouter = Router();

indexRouter.get('/', chatController.chat);
