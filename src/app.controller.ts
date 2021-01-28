import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard } from "@nestjs/passport";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {}

  @Get("google/redirect")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req);
  }

  @Get("github")
  @UseGuards(AuthGuard("github"))
  async githubAuth(@Req() req) {}

  @Get("github/redirect")
  @UseGuards(AuthGuard("github"))
  GithubAuthRedirect(@Req() req) {
    return this.appService.GithubLogin(req);
  }
}
