import { Injectable, HttpException } from '@nestjs/common';

import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from './interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import { UserFindDTO } from './dto/user.find.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>){}

    //probar, no se si funca
    async deleteUser(userDTO: UserDTO): Promise<UserInterface>{
        const deletedUser =  await this.userModel.findOneAndDelete(userDTO)
        if(!deletedUser) throw new HttpException('USER_NO_FOUND', 404)
        return deletedUser
    }

     //probar, no se si funca
    async updateUser(userDTO_old: UserDTO, userDTO_new: UserDTO): Promise<UserInterface>{
        const updatedUser = await this.userModel.findOneAndUpdate(userDTO_old,userDTO_new, {new : true})
        if(!updatedUser) throw new HttpException('USE_NO_FOUND', 404)
        return updatedUser
    }

    //uso de desarrollo
    async allUser(): Promise<UserInterface[]>{
        const users =  await  this.userModel.find();
        return users
    }



}
