import { Request, Response, NextFunction, RequestHandler } from 'express';
import config from 'config';

class ChatController {
  chat: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.render('index', {
        title: config.get('App.name')
      });
    } catch (err) {
      return res.render('error', err);
    }
  }
}

export const chatController = new ChatController();
