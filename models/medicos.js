import pkg from 'mongoose';
const { Schema, model } = pkg;
export const medicosSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    },
    hospital:{
        type:Schema.Types.ObjectId,
        ref: 'Hospital',
        required:true
    }

},{collection:'medicos'});

medicosSchema.method('toJSON',function(){
    const {__v,_id,password,...object} = this.toObject();

    object.uid = _id

    return object
});

export const Medicos = model('Medicos', medicosSchema);