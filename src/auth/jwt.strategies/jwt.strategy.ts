import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtConstants } from '../jwt.constants/jwt.constant';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JwtConstants.secret,
          });
    }

    async validate(payload: any) {
        return { userId: payload._id,
                 username: payload.username,
                 role: payload.role, 
                 email: payload.email, 
                 createdAt: payload.createdAT };
      }

}