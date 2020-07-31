
import { Schema, model, Document } from 'mongoose';



var likeSchema = new Schema({

    from: { type: Schema.Types.ObjectId, ref: 'user' },
    vid: { type: String ,required:true}



})
.index({ "vid": 1, "from": 1}, { unique: true });
export let Like = model('like', likeSchema);