import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GoogleStrategy } from "./google.strategy";
import { GithubStrategy } from "./github.strategy";
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, GithubStrategy],
})
export class AppModule {}
