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
    const uid = req.params.id
    try {
        const medicosDB = await Medicos.findById(uid)
        if(!medicosDB) return res.status(400).json({
            ok:false,
            msg:'no existe ningun medico con ese id'
        })

        const{nombre} = req.body
        const existeNombre = await Medicos.findOne({nombre})
        if(existeNombre) return res.status(400).json({
            ok:false,
            msg:'ya existe un medico con ese nombre'
        })
        const actualizarMedico = {
            nombre
        }
        const medicosActualizados = await Medicos.findByIdAndUpdate(uid,actualizarMedico,{new:true})

        res.json({
            ok:true,
            medicosActualizados
        })

        

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
        
    }
  
}

export const borrarMedicos = async (req,res = response) => {
    const uid = req.params.id

    try {

        const medicosDB = await Medicos.findById(uid)
        if(!medicosDB) return res.status(400).json({
            ok:false,
            msg:'no existe un medico con ese id'
        })

        await Medicos.findByIdAndDelete(uid)
        res.status(200).json({
            ok:true,
            msg:'medico eliminado'
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
        
        
    }
}