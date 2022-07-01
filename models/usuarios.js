import mongoose from "mongoose"

export const usuarioSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    role:{
        type:String,
        required:true,
        default:'USER_ROLE'
    },
    google:{
        type:Boolean,
        default:false
    }
});

usuarioSchema.method('toJSON',function(){
    const {__v,_id,password,...object} = this.toObject();

    object.uid = _id

    return object
})

export const Usuario = mongoose.model('Usuario', usuarioSchema);