import { Schema } from 'mongoose';

export const ExerciseSchema = new Schema({
    problem: {type :String, require :true},
    dificult: {type :Number, require :true},
    type: {type :Number, require :true},
    number_variables: {type :String, require :true},
    fraction: {type: Boolean, default: false},
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
    exp: {type: Boolean, default: false},
    int_def: {type: Boolean, default: false},
    createdAT: { type: Date, default: Date.now },
});