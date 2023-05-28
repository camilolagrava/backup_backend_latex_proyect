import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    username: {type :String, require :true},
    email: {type :String, require :true},
    password: {type :String, require :true},
    createdAT: { type: Date, default: Date.now },
    role: {type : Number , default: 1}
})