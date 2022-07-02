import { Router } from "express";
import { check } from "express-validator";
import { actualizarHospitales, borrarHospitales, crearHospitales, getHospitales } from "../controllers/hospitales.controllers.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

export const router3 = Router();

router3.get('/',getHospitales);

router3.post('/',
[
    validarJWT,
    check('nombre','el nombre del hospital es necesario').notEmpty(),
    validarCampos
]
,crearHospitales)

router3.put('/:id',
[]
,actualizarHospitales)

router3.delete('/:id',borrarHospitales)

