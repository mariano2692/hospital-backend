import { Hospitales } from "../models/hospitales.js"
import { Medicos } from "../models/medicos.js"
import { Usuario } from "../models/usuarios.js"

import * as fs from 'fs';


export const actualizarImagen = async (tipo,id,nombreArchivo)=>{
    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id)
            if(!usuario) return false
            //borrar imagen anterior
    
            if(fs.existsSync(`./uploads/usuarios/${usuario.img}`)){
                
                fs.unlinkSync(`./uploads/usuarios/${usuario.img}`)
            }

            usuario.img = nombreArchivo
            await usuario.save();
            return true
            
            
            break;
    
        case 'medicos':
            const medico = await Medicos.findById(id)
            if(!medico) return false
           
            //borrar imagen anterior
    
            if(fs.existsSync(`./uploads/medicos/${medico.img}`)){
                 
                fs.unlinkSync(`./uploads/medicos/${medico.img}`)
            }

            medico.img = nombreArchivo
            await medico.save();
            return true
                
            break;

        case 'hospitales':
            const hospital = await Hospitales.findById(id)
            if(!hospital) return false
            //borrar imagen anterior
    
            if(fs.existsSync(`./uploads/hospitales/${hospital.img}`)){
                fs.unlinkSync(`./uploads/hospitales/${hospital.img}`)
            }

            hospital.img = nombreArchivo
            await hospital.save();
            return true
            
            break;
                                
        default:
            break;
    }
}