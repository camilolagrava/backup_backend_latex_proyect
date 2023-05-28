import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { RegisteUserDTO } from './dto/register.dto';

import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


   @Post('/registerUser')
    async registerUser(@Res() res, @Body() userDTO: RegisteUserDTO){
        const user = await this.authService.registerUser(userDTO)
        res.status(HttpStatus.OK).json({
            user
        })
    }

    @Post('/login')
    async login(@Res() res, @Body() loginUserDTO: LoginUserDTO ){
      const user = await this.authService.login(loginUserDTO)
      res.status(HttpStatus.OK).json({
        user
      })
    }

}
