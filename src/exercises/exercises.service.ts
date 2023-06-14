import { HttpException, Injectable } from '@nestjs/common';

import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { ExerciseInterface } from './interfaces/exercise.interface';
import { ExerciseDTO } from './dto/exercise.dto';
import { ExerciseFindDTO } from './dto/exercise.find.dto';
import { ExerciseProducer } from './src/exercise.producer';

@Injectable()
export class ExercisesService {

    constructor(@InjectModel('Exercise') private readonly exerciseModel: Model<ExerciseInterface>){}

    async getAllExercises(): Promise<ExerciseInterface[]> {
        const exercises =  await  this.exerciseModel.find();
        return  exercises
    }

    async getExerciseById(exerciseId: string): Promise<ExerciseInterface>{
        const exercise = await this.exerciseModel.findById(exerciseId)
        if(!exercise) throw new HttpException('EXERCISE_NO_FOUND', 404)
        return exercise
    }

    async addExercise(exerciseDTO : ExerciseDTO ): Promise<ExerciseInterface>{
        const exercise = await this.exerciseModel.findOne({problem: exerciseDTO.problem})
        if(!exercise){
            const newProduct = new this.exerciseModel(exerciseDTO)
            return newProduct.save();
        }else{
            throw new HttpException('THIS_EXERCISE_IS_IN_THE_DATABASE_ALLREADY', 404)
        }
        
    }

    async deleteExerciseById(exerciseId: string): Promise<ExerciseInterface>{
        const deletedExercise =  await this.exerciseModel.findByIdAndDelete(exerciseId)
        if(!deletedExercise) throw new HttpException('EXERCISE_NO_FOUND', 404)
        return deletedExercise
    }

    //varios errores de disenno
    async upDateExerciseById(exerciseId: string, exerciseDTO : ExerciseDTO):  Promise<ExerciseInterface>{
        const updatedExercise = await this.exerciseModel.findByIdAndUpdate(exerciseId,exerciseDTO, { new: true})
        if(!updatedExercise) throw new HttpException('EXERCISE_NO_FOUND', 404)
        return updatedExercise
    }

    //funca, pero no se los limites
    async getExercisesByJson(exerciseDTO: ExerciseFindDTO): Promise<ExerciseInterface[]>{
        const exercises =  await  this.exerciseModel.find(exerciseDTO);
        if(!exercises) throw new HttpException('EXERCISE_NO_FOUND', 404)
        return  exercises
    }

    async getDev(): Promise<ExerciseInterface[]> {
        const exercises = await this.exerciseModel.find({type: 0})
        if(!exercises) throw new HttpException('EXERCISE_NO_FOUND', 404)
        return exercises
    }

    async getIntg(): Promise<ExerciseInterface[]> {
        const exercises = await this.exerciseModel.find({type: 1})
        if(!exercises) throw new HttpException('EXERCISE_NO_FOUND', 404)
        return exercises
    }

    async filldB(n : number):Promise<ExerciseInterface[]>{
        let arr_js = []
        const mo = new ExerciseProducer
        for(var i=0;  i <n; i ++){
            try {
                arr_js.push( await this.addExercise(mo.saver(this.getRandomArbitrary(1,6),this.getRandomArbitrary(0,2))))
              } catch (error) {
                console.log("uno no se pudo")
              }
        }
        return arr_js
    }

    private getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }

}
