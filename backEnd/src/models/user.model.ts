import { Schema, model, Document } from 'mongoose';


var userSchema = new Schema({
    // username:{type: String ,required: true},
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true, default: 'user' },
    age: { type: Number },


})
// .index({ "userStory.as": 1, "userStory.iwant": 1,"userStory.inorderto":1, "testDescription":1}, { unique: true });
export let User = model('user', userSchema);
export interface Iuser{
    name: string;
    password: string;
    email: string;
    type?: string;
    age?: number;
  }


  