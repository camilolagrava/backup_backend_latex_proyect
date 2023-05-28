import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { JwtStrategy } from 'src/auth/jwt.strategies/jwt.strategy';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema}
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy]
})
export class UsersModule {}
