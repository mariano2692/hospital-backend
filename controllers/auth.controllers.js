import { response } from "express";
import { Usuario } from "../models/usuarios.js";
import bcrypt from "bcryptjs"
import { generarJWT } from "../helpers/jwt.js";
import { googleVerify } from "../helpers/google-verify.js";




export const login = async(req,res= response)=>{

    const {email,password} = req.body

    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB) return res.status(400).json({
            ok:false,
            msg:'el email no es valido'
        })

        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password)
        if(!validPassword) return res.status(400).json({
            ok:false,
            msg:'la contraseña no es valida'
        })

        //generar JWT
        const token = await generarJWT(usuarioDB.id)

        res.status(200).json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }
 
}

export const googleSingIn =async (req,res=response)=>{


    try {
        const {email,name,picture} = await googleVerify(req.body.token);
        const usuarioDB = await Usuario.findOne({email})
        let usuario;

        if(!usuarioDB) usuario = new Usuario({
            nombre: name,
            email,
            password: '@@@',
            img:picture,
            google: true
        })
        else usuario = usuarioDB


        //guardar usuario
        await usuario.save();
        //generar JWT
        const token = await generarJWT(usuario.id)
        res.json({
            ok:true,
            email,
            name,
            picture,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:true,
            msg:'token de google no es correcto'
            
        })


        
    }

    

 

}