import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }
  GithubLogin(req) {
    if (!req.user) {
      return 'No user from Github'
    }

    return {
      message: 'User information from Github',
      user: req.user
    }
  }
}
