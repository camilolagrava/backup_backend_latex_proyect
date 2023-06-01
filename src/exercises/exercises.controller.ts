import { Controller, Get, Post, Put, Delete , Res, Body ,HttpStatus, Param, NotFoundException, Query, UseGuards, HttpException } from '@nestjs/common';

import { ExerciseDTO } from './dto/exercise.dto';
import { ExerciseFindDTO } from './dto/exercise.find.dto';
import { ExercisesService } from './exercises.service';
import { ExerciseListFindDTO } from './dto/exercises.list.find';
import { ExerciceUpdate } from './dto/exercise.update.dto';
import { LatexCreator } from './src/latex.creator';
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt.guards/jwt.auth-guard';



@Controller('exercises')
export class ExercisesController {

    private pdfReady = false
    constructor(private exercisesService : ExercisesService){}

    @UseGuards(JwtAuthGuard)
    @Post('/addExercise')
    async addExercise(@Res() res, @Body() exerciseDTO: ExerciseDTO){
        const exercise = await this.exercisesService.addExercise(exerciseDTO)
        res.status(HttpStatus.OK).json({
            exercise
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async allExercises(@Res() res){
        const exercises =  await this.exercisesService.getAllExercises();
       res.status(HttpStatus.OK).json({
            exercises
        })
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/deleteByID')
    async deleteByID(@Res() res, @Body() exerciseFindListDTO: ExerciseListFindDTO){

        const exercises = []
        for (let i = 0; i < exerciseFindListDTO.ids.length; i++) {
            const exercise = await this.exercisesService.deleteExerciseById(exerciseFindListDTO.ids[i])
            exercises.push(exercise)
        }

        res.status(HttpStatus.OK).json({
            exercises
        })

    }

    @UseGuards(JwtAuthGuard)
    @Post('/getByJson')
    async getByJson(@Res() res, @Body() exerciseFindDTO: ExerciseFindDTO){
        const exercises = await this.exercisesService.getExercisesByJson(exerciseFindDTO)
        res.status(HttpStatus.OK).json({
            exercises
        })
    }
   
    @UseGuards(JwtAuthGuard)
    @Post('/getListByID')
    async getListByID(@Res() res, @Body() exerciseListFindDTO : ExerciseListFindDTO){
        const exercises = []
        for (let i = 0; i < exerciseListFindDTO.ids.length; i++) {
            const exercise = await this.exercisesService.getExerciseById(exerciseListFindDTO.ids[i])
            exercises.push(exercise)
        }

        res.status(HttpStatus.OK).json({
            exercises
        })
    }

    @UseGuards(JwtAuthGuard)
    @Put('/updateByID')
    async updateByID(@Res() res, @Body() exerciceUpdate: ExerciceUpdate ){
        const exercise = await this.exercisesService.upDateExerciseById(exerciceUpdate.ids, exerciceUpdate.exercise)
        res.status(HttpStatus.OK).json({
            exercise
        })
    }

    @UseGuards(JwtAuthGuard)
    @Post('/sentLatex')
    async sentLatex(@Res() res, @Body() exerciseListFindDTO : ExerciseListFindDTO)/*: Promise<Observable<Object>>*/{
        const exercises = []
        for (let i = 0; i < exerciseListFindDTO.ids.length; i++) {
            const exercise = await this.exercisesService.getExerciseById(exerciseListFindDTO.ids[i])
            exercises.push(exercise)
        }
        const latex = new LatexCreator
        await latex.textBuild(exercises)
        res.status(HttpStatus.OK).sendFile(join(process.cwd(),'/src/exercises/src/the_latex_file_to_send/latex_folder/exercices.tex'))
    }

    @UseGuards(JwtAuthGuard)
    @Post('/createPdf')
    async createPdf(@Res() res, @Body() exerciseListFindDTO : ExerciseListFindDTO){
        const exercises = []
        for (let i = 0; i < exerciseListFindDTO.ids.length; i++) {
            const exercise = await this.exercisesService.getExerciseById(exerciseListFindDTO.ids[i])
            exercises.push(exercise)
        }
        const latex = new LatexCreator
        await latex.textBuild(exercises)
        await latex.createPdf()
        this.pdfReady = true
        res.status(HttpStatus.OK).json({
            message: 'the pdf was created, now you can downland'
        })
        
    }

    @UseGuards(JwtAuthGuard)
    @Get('/downloadPdf')
    async downloadPdf(@Res() res){
        if(this.pdfReady){
            res.status(HttpStatus.OK).sendFile(join(process.cwd(),'/src/exercises/src/the_latex_file_to_send/pdf/exercices.pdf'))
            this.pdfReady = false
        }else{
            res.status(HttpStatus.OK).json({
                message: 'there not a pdf created'
            })
        }
        
        
    }



}
