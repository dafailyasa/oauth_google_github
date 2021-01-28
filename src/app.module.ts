import { HttpModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GoogleStrategy } from "./google.strategy";
import { GithubStrategy } from "./github.strategy";
@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, GithubStrategy],
})
export class AppModule {}
