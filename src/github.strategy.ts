import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-github";
import { config } from "dotenv";

import { Injectable } from "@nestjs/common";

config();

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor() {
    super({
      clientID: "b2cc886b35523ed0b2d5",
      clientSecret: "2f299a6eef8c2260e92adf4ed1285e8708d593ca",
      callbackURL: "http://localhost:3000/github/redirect",
      scope: ["email", "profile", "repo"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { displayName, username, photos } = profile;
    const user = {
      displayName,
      username,
      accessToken,
      photos,
      refreshToken,
    };
    done(null, user);
  }
}
