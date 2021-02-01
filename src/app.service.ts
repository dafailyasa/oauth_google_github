import {
  Injectable,
  HttpService,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { map } from "rxjs/operators";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";

@Injectable()
export class AppService {
  private readonly DATA_URL = "https://api.github.com/user/repos";

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
  async createRepository(req): Promise<Observable<AxiosResponse<any>>> {
    if (!req.headers.authorization ) {
      throw new HttpException(
        "please return the token!",
        HttpStatus.BAD_REQUEST
      );
    }

    const data = req.body.name
    const reqHeader = {headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.authorization,
      Accept: "application/vnd.github.nebula-preview+json",
    }}
    
    return await this.httpService
      .post(
        this.DATA_URL,
        { name: data},
        reqHeader
      )
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }
}
