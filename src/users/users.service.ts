import { Injectable, HttpException } from '@nestjs/common';

import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from './interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import jwtDecode from 'jwt-decode';
import { UserFindDTO } from './dto/user.find.dto';
import { hash, compare } from 'bcrypt';
import { tokenDTO } from 'src/auth/dto/token.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>){}

    async deleteUser(usertoken: string): Promise<UserInterface>{
        const g_t= usertoken.split(" ")
        const decode: tokenDTO = jwtDecode(g_t[1])
        const deletedUser =  await this.userModel.findByIdAndDelete(decode.id)
        if(!deletedUser) throw new HttpException('USER_NO_FOUND', 404)
        return deletedUser
    }

    async updateUser(usertoken: string, userDTO_new: UserDTO): Promise<UserInterface>{
        const g_t= usertoken.split(" ")
        const decode: tokenDTO = jwtDecode(g_t[1])
        const updatedUser = await this.userModel.findByIdAndUpdate(decode.id,userDTO_new, {new : true})
        if(!updatedUser) throw new HttpException('USE_NO_FOUND', 404)
        return updatedUser
    }

    //uso de desarrollo
    async allUser(): Promise<UserInterface[]>{
        const users =  await  this.userModel.find();
        return users
    }



}
