import { response } from "express";
import path from 'path'
import * as fs from 'fs'
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { actualizarImagen } from "../helpers/actualizar-imagen.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);




export const uploadFile =(req,res=response)=>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    //validar tipo
    const tiposValidos = ['usuarios','medicos','hospitales']
    if(!tiposValidos.includes(tipo)) return res.status(400).json({
        ok:false,
        msg:'el tipo seleccionado debe ser usuarios, medicos y hospitales'
    });
    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json({
        ok:false,
        msg:'no se subio ningun archivo'
    });
    //procesar la imagen
    const file = req.files.imagen
    const nombreCortado = file.name.split('.')
    const extensionArchivo = nombreCortado[nombreCortado.length -1]

    //validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(extensionArchivo)) return res.status(400).json({
        ok:false,
        msg:'no es una extension valida'
    });

    //generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`

    //mover la imagen
    file.mv(path, (err)=> {
        if (err){ 
            console.log(err)
            return res.status(500).json({
            ok:false,
            msg:'error al mover la imagen'
          });
        }

        //actualizar base de datos
        actualizarImagen(tipo,id,nombreArchivo);

        res.json({
            ok:true,
            nombreArchivo
        })
    
      
      });

 


}

export const retornaImagen =(req,res=response)=>{

    const tipo = req.params.tipo;
    const imagen = req.params.imagen;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${imagen}`);
    
    //imagen por defecto
    if(fs.existsSync(pathImg)) res.sendFile(pathImg);
    else{
        const pathImg = path.join( __dirname, `../uploads/no-img.jpeg`);
        res.sendFile(pathImg)
    }
        
    

    

}