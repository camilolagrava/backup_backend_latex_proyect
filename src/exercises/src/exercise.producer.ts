import { ExerciseDTO } from "../dto/exercise.dto"
import { ExerciseFillDBDTO } from "../dto/exercise.fill.db.dto"

export class ExerciseProducer{

    private inte = "\\int_{a}^{b}"
    private deri = "\\,dx\\"

    /*private frac = "\\frac{}{}"
    private plus = "+"
    private minus = "-"
    private cdot = "\\cdot"
    private div = "\\div"
    private sqrt = "\\sqrt{..}"
    private sqrtn = "\\sqrt[n]{..}"
    private arcos = "\\arccos"
    private arsin ="\\arcsin"
    private arctan ="\\arctan"
    private cos ="\\cos"
    private csc ="\\csc"
    private cosh ="\\cosh"
    private ln ="\\ln"
    private log ="\\log"
    private sin ="\\sin"
    private tan ="\\tan"
    private sec ="\\sec"
    private exp ="\\exp^{}"
    private ele = "^{}"*/

    private arr = []
    //private f_1 = [0,13]
   // private f_ = [14,19]

    constructor(){
      this.arr.push( ["-(",")"])
      this.arr.push( ["\\sqrt{","}"])
      this.arr.push( ["\\cos(",")"])
      this.arr.push( ["\\sin(",")"])
      this.arr.push( ["\\tan(",")"])
      this.arr.push( ["\\arccos(",")"])
      this.arr.push( ["\\arcsin(",")"])
      this.arr.push( ["\\arctan(",")"])
      this.arr.push( ["\\csc(",")"])
      this.arr.push( ["\\cosh(",")"])
      this.arr.push( ["\\ln(",")"])
      this.arr.push( ["\\log(",")"])
      this.arr.push( ["\\sec(",")"])
      this.arr.push( ["\\exp^{","}"])
      ////////////////////////
      this.arr.push( ["\\frac{","}{","}"])
      this.arr.push( ["(",")+(",")"])
      this.arr.push( ["(",")-(",")"])
      this.arr.push( ["(",")\\cdot(",")"])
      this.arr.push( ["\\sqrt[","]{","}"])
      this.arr.push( ["(",")^{","}"])
    }

    saver(d : number, i_d: number): ExerciseDTO{
      let js: ExerciseFillDBDTO ={
        int_def: false,
        frac: false ,
         cdot : false ,
         sqrt : false ,
         sqrtn : false ,
         arcos : false ,
         arsin : false ,
         arctan : false ,
         cos : false ,
         csc : false ,
         cosh : false ,
         ln : false ,
         log : false ,
         sin : false ,
         tan : false ,
         sec : false ,
         exp : false ,
         ele : false ,
         number_variables: 1,
         problem : "" ,
         dificult : d ,
         type : 3 ,
    }

    js.problem = this.productor_(d, js) + this.deri
    if(i_d ==0){
      js.type = 1
      js.problem = this.inte + js.problem
    }else{
      js.type = 0
    }

    const js_ : ExerciseDTO = js
    return js_

    }

    private productor_(i : number, js: ExerciseFillDBDTO): string{
        if(i <=2 && i>0){
          //console.log(i)
          return this.exer_1(this.getRandomInt(14),this.productor_(i-1,js), js)
        }else if(i<=5 && i>=3){
          if(this.getRandomInt(2)==0){
            //console.log(i)
            return this.exer_1(this.getRandomInt(14),this.productor_(i-1,js),js)
          }else{
            //console.log(i)
            return this.exer_2(this.getRandomArbitrary(14,20),this.productor_(i-1,js),this.productor_(i-(this.getRandomArbitrary(1,3)),js),js)
          }
        }
        return "x"
    }

    private exer_1(position: number,element: string, js: ExerciseFillDBDTO): string{
      switch(position){
        case 1:
          js.sqrt = true
          break;
        case 2:
          js.cos = true
          break;
        case 3:
          js.sin= true
          break;
        case 4:
          js.tan = true
          break;
        case 5:
          js.arcos = true
          break;
        case 6:
          js.arsin= true
          break;
        case 7:
          js.arctan =true
          break;
        case 8:
          js.csc = true
          break;
        case 9:
          js.cosh = true
          break;
        case 10:
          js.ln = true
          break;
        case 11:
          js.log = true
          break;
        case 12:
          js.sec =true
          break;
        case 13:
          js.exp =true
          break;
      }
      return this.arr[position][0]+ element +this.arr[position][1]
    }

    private exer_2(position: number,element1: string, element2:string, js: ExerciseFillDBDTO): string{
      switch(position){
        case 14:
          js.frac = true
          break;
        case 17:
          js.cdot = true
          break;
        case 18:
          js.sqrtn = true
          break;
        case 19:
          js.ele = true
          break;
      }
      return this.arr[position][0]+ element1 +this.arr[position][1]+ element2 +this.arr[position][2]
    }

    private getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    private getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

}