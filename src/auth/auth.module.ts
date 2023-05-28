import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './jwt.constants/jwt.constant';
import { JwtStrategy } from './jwt.strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
    {name: 'User', schema: UserSchema}
  ]),
  JwtModule.register({
    global: true,
    secret: JwtConstants.secret,
    signOptions: { expiresIn: '24h' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
