import { ExerciseInterface } from "../interfaces/exercise.interface";
import { HttpException } from '@nestjs/common';

const fs = require('fs');
const path = require('path');
//const selflatex = require('node-latex-pdf');
const { exec } = require('child_process');

const pathHead        = path.join(process.cwd(),"/src/exercises/src/the_latex_file_to_send/head.txt")
const pathTail        = path.join(process.cwd(),'/src/exercises/src/the_latex_file_to_send/tail.txt')
const pathWhereLatex  = path.join(process.cwd(),'/src/exercises/src/the_latex_file_to_send/latex_folder/exercices.tex' )
const pathPdf         = path.join(process.cwd(),'/src/exercises/src/the_latex_file_to_send/pdf' )
//const pathToZip       = path.join(process.cwd(),'/src/exercises/src/the_latex_file_to_send/latex_folder' )

export class LatexCreator{

    private head = fs.readFileSync(pathHead,"utf-8");
    private tail = fs.readFileSync(pathTail,"utf-8");
    private separador1 = '\\['
    private separador2 = "\]\n"

    private isLatexReady= false

    async textBuild( exercises : ExerciseInterface[] ){
        let latex = this.head + '\n'
        for (let i = 0; i < exercises.length; i++) {
            latex = latex + this.separador1 + exercises[i].problem + this.separador2
        }
        latex = latex + this.tail
        await fs.writeFileSync(pathWhereLatex,latex,"utf-8")
    }

    createPdf(){
            this.createPdf_(pathWhereLatex, pathPdf, (err,msg) => {
                if(err){
                    console.log(`Error, ${msg}`);
                    throw new HttpException('SOMETHING_APPER_', 403)
                }      
            })
    }

    createPdf_(src_file,dest_file,callback){
        exec("pdflatex -output-directory " + dest_file + " " + src_file, (err,stdout,stderr) => {
            if (err) {
                callback(1,`pdflatex[1] error: ${err}`);
            }else{
            // compile second time to fit the usage
                exec("pdflatex -output-directory " + dest_file + " " + src_file, (err,stdout,stderr) => {
                    if (err) {
                        callback(1,`pdflatex[2] error: ${err}`);
                    }
                    else{
                        callback(0,`[node-latex-complete] Complete source: ${src_file}, check out result in ${dest_file}!`);
                    }
                });
            }
        });
    }

}