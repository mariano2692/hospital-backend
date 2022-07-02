import { Router } from "express";
import { getDocumentosColeccion, getTodo } from "../controllers/busquedas.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

export const router5 = Router();

router5.get('/:busqueda',
[
    validarJWT
]
,getTodo)

router5.get('/coleccion/:tabla/:busqueda',[validarJWT],getDocumentosColeccion)