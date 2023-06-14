import { Schema } from 'mongoose';

export const ExerciseSchema = new Schema({
    problem: {type :String, require :true},
    dificult: {type :Number, require :true},
    type: {type :Number, require :true},
    number_variables: {type :String, require :true},

    /*fraction: {type: Boolean, default: false},
    root: {type: Boolean, default: false},
    ln: {type: Boolean, default: false},
    log: {type: Boolean, default: false},
    tang: {type: Boolean, default: false},
    sen: {type: Boolean, default: false},
    cosn: {type: Boolean, default: false},
    arctang: {type: Boolean, default: false},
    arcsen: {type: Boolean, default: false},
    arccosn: {type: Boolean, default: false},
    cotang: {type: Boolean, default: false},
    exp: {type: Boolean, default: false},*/
    
    int_def: {type: Boolean, default: false},
    createdAT: { type: Date, default: Date.now },

    frac :  {type: Boolean, default: false},
   // plus :  {type: Boolean, default: false},
   // minus :  {type: Boolean, default: false},
    cdot :  {type: Boolean, default: false},
    //div :  {type: Boolean, default: false},
    sqrt :  {type: Boolean, default: false},
    sqrtn :  {type: Boolean, default: false},
    arcos :  {type: Boolean, default: false},
    arsin : {type: Boolean, default: false},
    arctan : {type: Boolean, default: false},
    cos : {type: Boolean, default: false},
    csc : {type: Boolean, default: false},
    cosh : {type: Boolean, default: false},
    ln : {type: Boolean, default: false},
    log : {type: Boolean, default: false},
    sin : {type: Boolean, default: false},
    tan : {type: Boolean, default: false},
    sec : {type: Boolean, default: false},
    exp : {type: Boolean, default: false},
    ele :  {type: Boolean, default: false},



});