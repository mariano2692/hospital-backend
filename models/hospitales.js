import pkg from 'mongoose';
const { Schema, model } = pkg;
export const hospitalSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    usuario:{
        required:true,
        type:Schema.Types.ObjectId,
        ref: 'Usuario'
    }

},{collection:'hospitales'});

hospitalSchema.method('toJSON',function(){
    const {__v,_id,password,...object} = this.toObject();

    object.uid = _id

    return object
});

export const Hospitales = model('Hospital', hospitalSchema);