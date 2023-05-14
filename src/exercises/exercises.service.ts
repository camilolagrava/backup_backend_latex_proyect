import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { ExerciseInterface } from './interfaces/exercise.interface';
import { ExerciseDTO } from './dto/exercise.dto';
import { ExerciseFindDTO } from './dto/exercise.find.dto';
import { ExerciseListFindDTO } from './dto/exercises.list.find';

@Injectable()
export class ExercisesService {

    constructor(@InjectModel('Exercise') private readonly exerciseModel: Model<ExerciseInterface>){}

    async getAllExercises(): Promise<ExerciseInterface[]> {
        const exercises =  await  this.exerciseModel.find();
        return  exercises
    }

    async getExerciseById(exerciseId: string): Promise<ExerciseInterface>{
        const exercise = await this.exerciseModel.findById(exerciseId)
        return exercise
    }

    async addExercise(exerciseDTO : ExerciseDTO ): Promise<ExerciseInterface>{
        const newProduct = new this.exerciseModel(exerciseDTO)
        return newProduct.save();
    }

    async deleteExerciseById(exerciseId: string): Promise<ExerciseInterface>{
        const deletedExercise =  await this.exerciseModel.findByIdAndDelete(exerciseId)
        return deletedExercise
    }

    async upDateExerciseById(exerciseId: string, exerciseDTO : ExerciseDTO):  Promise<ExerciseInterface>{
        const updatedExercise = await this.exerciseModel.findByIdAndUpdate(exerciseId,exerciseDTO, {new : true})
        return updatedExercise
    }

    //funca, pero no se los limites
    async getExercisesByJson(exerciseDTO: ExerciseFindDTO): Promise<ExerciseInterface[]>{
        const exercises =  await  this.exerciseModel.find(exerciseDTO);
        return  exercises
    }

}
