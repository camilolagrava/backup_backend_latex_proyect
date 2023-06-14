export class ExerciseFindDTO{
    readonly problem: string;
    readonly dificult: number;
    readonly type: number;
    readonly number_variables: number;

    /*readonly fraction: boolean;
    readonly root: boolean;
    readonly ln: boolean;
    readonly tang: boolean;
    readonly sen: boolean;
    readonly cosn: boolean;
    readonly arctang: boolean;
    readonly arcsen: boolean;
    readonly arccosn: boolean;
    readonly cotang: boolean;
    readonly exp: boolean;*/

    readonly frac : boolean;
    //readonly plus : boolean;
   // readonly minus : boolean;
    readonly cdot : boolean;

    readonly sqrt : boolean;
    readonly sqrtn : boolean;
    readonly arcos : boolean;
    readonly arsin :boolean;
    readonly arctan :boolean;
    readonly cos :boolean;
    readonly csc :boolean;
    readonly cosh :boolean;
    readonly ln :boolean;
    readonly log :boolean;
    readonly sin :boolean;
    readonly tan :boolean;
    readonly sec :boolean;
    readonly exp :boolean;
    readonly ele : boolean;

    readonly int_def : boolean;
}