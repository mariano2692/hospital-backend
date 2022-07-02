import { response } from "express";
import { Hospitales } from "../models/hospitales.js";
import { Medicos } from "../models/medicos.js";
import { Usuario } from "../models/usuarios.js";



export const getTodo = async (req,res=response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i')

    // const usuario = await Usuario.find({nombre:regex})
    // const hospitales = await Hospitales.find({nombre:regex})
    // const medicos = await Medicos.find({nombre:regex})

    const [usuario,medicos,hospitales] = await Promise.all([
         Usuario.find({nombre:regex}),
         Hospitales.find({nombre:regex}),
         Medicos.find({nombre:regex})

    ])
    res.json({
        ok:true,
        usuario,
        hospitales,
        medicos
    })
}

export const getDocumentosColeccion = async (req,res=response)=>{

    const tabla = req.params.tabla
    const busqueda = req.params.busqueda
    const regex = new RegExp(busqueda, 'i');

    let data;

    switch (tabla) {
        case 'medicos':
            data = await Medicos.find({nombre: regex})
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img')
            break;
        case "hospitales":
            data = await Hospitales.find({nombre:regex})
                                   .populate('usuario','nombre img')
            break;
        case 'usuarios':
            data = await Usuario.find({nombre:regex})
            break;    
    
        default:
            return res.status(400).json({
                ok:false,
                msg:'la tabla tiene que ser medicos,usuarios,hospitales'
            })
    }

    res.json({
        ok:true,
        resultados:data
    })
}