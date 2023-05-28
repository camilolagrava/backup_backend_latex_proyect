import { Controller, Get, Post, Put, Delete , Res, Body ,HttpStatus, Param, NotFoundException, Query, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guards/jwt.auth-guard';
import { UserFindDTO } from './dto/user.find.dto';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService){}

    //creado por uso de dasarrollo
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async allUsers(@Res() res){
        const user =  await this.userService.allUser();
        res.status(HttpStatus.OK).json({
           user
        })
    }

    //usar jwt
    @UseGuards(JwtAuthGuard)
    @Post('/updateUser')
    async updateUser(@Res() res, @Body() user: UserFindDTO ){
        //const user =  await this.userService.updateUser(userFindDTO)
        res.status(HttpStatus.OK).json({
            user
         })
    }

    //usar jwt
    @UseGuards(JwtAuthGuard)
    @Post('/deletUser')
    async deletUser(@Res() res, @Body() user: UserFindDTO ){
        //const user =  await this.userService.updateUser(userFindDTO)
    }



}
