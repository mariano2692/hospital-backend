import { response } from "express";
import { Medicos } from "../models/medicos.js";

export const getMedicos = async (req,res = response) => {

    const medicos = await Medicos.find()
                                 .populate('usuario','nombre')
                                 .populate('hospital','nombre')   
    res.json({
        ok:true,
        medicos
    })
}


export const crearMedicos = async (req,res = response) => {
    const uid = req.uid
    const medicos = new Medicos({usuario:uid,...req.body});

    try {
        const medicosDB = await medicos.save()

        res.json({
            ok:true,
            medico: medicosDB
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }

    
}


export const actualizarMedicos = async (req,res = response) => {
    res.json({
        ok:true,
        msg:'put medicos'
    })
}

export const borrarMedicos = async (req,res = response) => {
    res.json({
        ok:true,
        msg:'delete medicos'
    })
}