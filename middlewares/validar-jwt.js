import jwt from "jsonwebtoken"
import { Usuario } from "../models/usuarios.js"



export const validarJWT=(req,res,next)=>{
    //leer el token
    const token = req.header('x-token')

    if(!token) return res.status(401).json({
        ok:false,
        msg:'no hay token en la peticion'
    })

    try {

        const {uid} = jwt.verify(token, process.env.JWT_SECRET)

        req.uid = uid
        next();

        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'token no valido'
        })
        
    }

   
}

export const  validarAdminRole =async (req,res,next)=>{
    const uid = req.uid
    try {

        const usuarioDB = await Usuario.findById(uid)

        if(!usuarioDB) return res.status(404).json({
            ok:false,
            msg:'usuario no existe'
        })

        if(usuarioDB.role !== 'ADMIN_ROLE') return res.status(403).json({
            ok:false,
            msg:'no tiene privilegios'
        });

        next();

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })
    }

}


export const  validarAdminRole_o_mismoUsuario = async (req,res,next)=>{
    const uid = req.uid
    const id = req.params.id
    try {

        const usuarioDB = await Usuario.findById(uid)

        if(!usuarioDB) return res.status(404).json({
            ok:false,
            msg:'usuario no existe'
        })

        if(usuarioDB.role !== 'ADMIN_ROLE' && uid !== id) return res.status(403).json({
            ok:false,
            msg:'no tiene privilegios'
        });

        next();

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })
    }

}