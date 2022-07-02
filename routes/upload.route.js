import { Router } from "express";
import fileUpload from "express-fileupload";
import { retornaImagen, uploadFile } from "../controllers/upload.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";



export const router6 = Router();

router6.use(fileUpload());

router6.put('/:tipo/:id',validarJWT,uploadFile);

router6.get('/:tipo/:imagen',retornaImagen)