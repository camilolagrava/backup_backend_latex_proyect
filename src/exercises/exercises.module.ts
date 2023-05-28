import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseSchema } from './schemas/exercise.schema';
import { JwtStrategy } from 'src/auth/jwt.strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Exercise', schema: ExerciseSchema}
    ])
  ],
  controllers: [ExercisesController],
  providers: [ExercisesService, JwtStrategy]
})
export class ExercisesModule {}

