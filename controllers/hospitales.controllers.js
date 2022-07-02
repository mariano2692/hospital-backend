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
    res.json({
        ok:true,
        msg:'put hospitales'
    })
}

export const borrarHospitales = async (req,res = response) => {
    res.json({
        ok:true,
        msg:'delete hospitales'
    })
}

