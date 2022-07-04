import { response } from "express";
import { Hospitales } from "../models/hospitales.js";


export const getHospitales = async (req,res = response) => {

    const hospitales = await Hospitales.find()
                                       .populate('usuario','nombre')  

    res.json({
        ok:true,
        hospitales
    })
}

export const crearHospitales = async (req,res = response) => {
    const uid = req.uid
    const hospital = new Hospitales({usuario: uid,...req.body})
    
    
    try {
        const hospitalDB = await hospital.save();
        
    res.json({
        ok:true,
        hospital:hospitalDB
    })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
        
    }


}

export const actualizarHospitales = async (req,res = response) => {

    const uid = req.params.id

    try {
        const hospitalDB = await Hospitales.findById(uid)

        if(!hospitalDB) return res.status(400).json({
            ok:false,
            msg:`no existe el id ${uid} en la base de datos`
        })

        //actualizaciones
        const {nombre, ...campos} = req.body
   
        const existeNombre = await Hospitales.findOne({nombre});
        if(existeNombre)return res.status(400).json({
            ok:false,
            msg:'ya existe un hospital con ese nombre'
        })

        const cambiosHospital = {
            ...req.body
        }

        const hospitalActualizado = await Hospitales.findByIdAndUpdate(uid,cambiosHospital, {new:true})

        res.json({
            ok:true,
            hospital: hospitalActualizado
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
        
    }

}

export const borrarHospitales = async (req,res = response) => {
    const uid = req.params.id

    try {

        const hospitalesDB = await Hospitales.findById(uid)
        if(!hospitalesDB) return res.status(400).json({
            ok:false,
            msg:'no existe un hospital con ese id'
        })

        await Hospitales.findByIdAndDelete(uid)
        res.status(200).json({
            ok:true,
            msg:'hospital eliminado'
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
        
        
    }
}

