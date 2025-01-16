import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards';
import { UserRequest } from 'src/common/interfaces';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() req: UserRequest) {
    console.log(req?.user);
    return 'ok';
  }
}
