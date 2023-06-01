import { Injectable, HttpException } from '@nestjs/common';

import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from 'src/users/interfaces/user.interface';
import { RegisteUserDTO } from './dto/register.dto';
import { LoginUserDTO } from './dto/login.user.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt'



@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>, private jwtService: JwtService){}

  async registerUser(userDTO : RegisteUserDTO ): Promise<UserInterface>{
      const { password } = userDTO
      if(await this.userModel.findOne({email: userDTO.email})){
        throw new HttpException('THIS_EMAIL_IS_IN_USE', 403)
      }else{
        const passhash = await hash(password,10)
        userDTO = {...userDTO, password:passhash}
        return this.userModel.create(userDTO)
      }
  }

  async login(userDTO: LoginUserDTO){
      const {email, password} = userDTO
      const user = await this.userModel.findOne({email})

      if(!user) throw new HttpException('USER_NO_FOUND', 404)

      const checkpass = await compare(password, user.password)

      if(!checkpass) throw new HttpException('INVALID_PAASWORD', 403)
      
      const payload = {id : user._id, name: user.username}
      const token = this.jwtService.sign(payload)

      const data = {
        user,
        token
      }
      
      return data
  }
}
