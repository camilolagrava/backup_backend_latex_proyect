import { ExerciseInterface } from "../interfaces/exercise.interface";
import JSZip from 'jszip';

const fs = require('fs');
const path = require('path');
const selflatex = require('node-latex-pdf');

const pathHead        = path.join(process.cwd(),"/src/exercises/src/the_latex_file_to_send/head.txt")
const pathTail        = path.join(process.cwd(),'/src/exercises/src/the_latex_file_to_send/tail.txt')
const pathWhereLatex  = path.join(process.cwd(),'/src/exercises/src/the_latex_file_to_send/latex_folder/exercices.tex' )
const pathPdf         = path.join(process.cwd(),'/src/exercises/src/the_latex_file_to_send/pdf' )
const pathToZip       = path.join(process.cwd(),'/src/exercises/src/the_latex_file_to_send/latex_folder' )

export class LatexCreator{

    head = fs.readFileSync(pathHead,"utf-8");
    tail = fs.readFileSync(pathTail,"utf-8");
    separador1 = '\\['
    separador2 = "\]\n"

    async textBuild( exercises : ExerciseInterface[] ){
        let latex = this.head + '\n'
        for (let i = 0; i < exercises.length; i++) {
            latex = latex + this.separador1 + exercises[i].problem + this.separador2
        }
        latex = latex + this.tail
        await fs.writeFileSync(pathWhereLatex,latex,"utf-8")
    }

    async latexToPdf(){
        await selflatex(pathWhereLatex, pathPdf, (err,msg) => {
            if(err)
                console.log(`Error, ${msg}`);
            else
                console.log(`Success!`);
        });
    }

    getPathPDF(): string{
        return pathPdf+'/exercices.pdf'
    }

    getPathTex(): string{
        return pathWhereLatex
    }

    /*async zipfile(){
        const zip = JSZip
        zip.file(fs.readFileSync(pathToZip,"utf-8"), pathDestination)
        const content = await zip.generateAsync({type:"nodebuffer"})
        fs.writeFileSync(pathDestination, content )
    }*/

}