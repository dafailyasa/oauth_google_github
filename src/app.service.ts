import {
  Injectable,
  HttpService,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { map } from "rxjs/operators";

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return "Hello World!";
  }

  googleLogin(req) {
    if (!req.user) {
      return "No user from google";
    }

    return {
      message: "User information from google",
      user: req.user,
    };
  }
  GithubLogin(req) {
    if (!req.user) {
      return "No user from Github";
    }

    return {
      message: "User information from Github",
      user: req.user,
    };
  }
  createRepository(req) {
    if (!req.headers.authorization) {
      throw new HttpException(
        "please return the token!",
        HttpStatus.BAD_REQUEST
      );
    }

    return this.httpService
      .post(
        "https://api.github.com/user/repos",
        { name: req.body.name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: req.headers.authorization,
            Accept: "application/vnd.github.nebula-preview+json",
          },
        }
      )
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }
}
