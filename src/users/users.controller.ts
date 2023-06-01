import { Controller, Get, Post, Put, Delete , Res, Body ,HttpStatus, Param, NotFoundException, Query, UseGuards, Headers } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guards/jwt.auth-guard';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService){}

   
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async allUsers(@Res() res){
        const user =  await this.userService.allUser();
        res.status(HttpStatus.OK).json({
           user
        })
    }

    @UseGuards(JwtAuthGuard)
    @Post('/updateUser')
    async updateUser(@Res() res, @Body() userDto: UserDTO, @Headers() head ){
        const user =  await this.userService.updateUser(head.authorization,userDto)
        res.status(HttpStatus.OK).json({
            user
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get('/deletUser')
    async deletUser(@Res() res, @Headers() head){
        const user =  await this.userService.deleteUser(head.authorization)
        res.status(HttpStatus.OK).json({
            user
        })
    }



}
