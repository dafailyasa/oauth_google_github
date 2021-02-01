import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from "dotenv";

import { Injectable } from "@nestjs/common";

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID:
        "444831648451-i1ff4uj23sosg0pm26hbdgu6hsp728ua.apps.googleusercontent.com",
      clientSecret: "GjDd4UM9lNqqgObyMHsYlb7K",
      callbackURL: "http://localhost:3000/google/redirect",
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { name, emails, photo } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photo,
      accessToken,
    };
    done(null, user);
  }
}
