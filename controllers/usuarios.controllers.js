import { Usuario } from "../models/usuarios.js";
import bcrypt from "bcryptjs"
import { generarJWT } from "../helpers/jwt.js";



export const getUsuarios = async (req,res)=>{

    const usuarios = await Usuario.find();
    res.json({
        ok:true,
        usuarios,
        uid:req.uid
    })

}

export const crearUsuarios = async (req,res)=>{
    
    const {email, password, nombre} = req.body;


    try {
    //validar email
    const existeEmail = await Usuario.findOne({email})

    if(existeEmail) return res.status(400).json({
        ok:false,
        msg:'el correo esta registrado'
    })
        
    const usuario = new Usuario(req.body);

    //encriptar contraseña

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt)
    
    
    //guardar usuario
    await usuario.save();

    //generar jwt
    const token = await generarJWT(usuario.id)

    res.json({
        ok:true,
        usuario,
        token
    })
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok:false,
            msg:'error inesperado'
        })
        
    }


}

export const actualizarUsuarios = async (req,res) => {

    const uid = req.params.id
    try {

        const usuarioDB = await Usuario.findById(uid)

        if(!usuarioDB) return res.status(404).json({
            ok:false,
            msg:'no existe un usuario con ese id'
        })
        
        //actualizaciones
        const {password,google,email,...campos} = req.body;
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail)return res.status(400).json({
            ok:false,
            msg:'ya existe un usuario con ese email'
        })

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos)

        res.json({
            ok:true,
            usuario: usuarioActualizado
        })
        
        
    } catch (error) {
        console.log(error)
    }

}

export const borrarUsuario = async (req,res) => {
    const uid = req.params.id

    try {
        const usuarioDB = await Usuario.findById(uid)

        if(!usuarioDB) return res.status(400).json({
            ok:false,
            msg:'no existe un usuario con ese id'
        })

        await Usuario.findByIdAndDelete(uid)

        res.status(200).json({
            ok:true,
            msg:'usuario eliminado'
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
        
    }


}