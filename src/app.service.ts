import {
  Injectable,
  HttpService,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CreateRepository, RepositoryResponseObject } from './github.dto';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  private readonly DATA_URL = 'https://api.github.com/user/repos';

  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    const source: {
      userAgent: req.headers['user-agent'];
    };
    console.log(`Receiving timeline from source: ${source}`);

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
  GithubLogin(req) {
    if (!req.user) {
      return 'No user from Github';
    }

    return {
      message: 'User information from Github',
      user: req.user,
    };
  }
  async createRepository(req): Promise<RepositoryResponseObject[]> {
    if (!req.headers.authorization) {
      throw new HttpException('input the token', HttpStatus.BAD_REQUEST);
    }

    const name = { name: req.body.name };
    const token = req.headers.authorization;
    try {
      const res = await axios.post(
        'https://api.github.com/user/repos',
        JSON.stringify(name),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.nebula-preview+json',
          },
        },
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }

  // async createRepository(req): Promise<Observable<AxiosResponse<any>>> {
  //   if (!req.headers.authorization) {
  //     throw new HttpException(
  //       "please return the token!",
  //       HttpStatus.BAD_REQUEST
  //     );
  //   }

  //   const data = req.body.name
  //   const reqHeader = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: req.headers.authorization,
  //       Accept: "application/vnd.github.nebula-preview+json",
  //     }
  //   }
  //   return await this.httpService
  //     .post(
  //       this.DATA_URL,
  //       { name: data },
  //       reqHeader
  //     )
  //     .pipe(
  //       map((res) => {
  //         return res.data;
  //       })
  //     );
  // }
}
