import { Router } from "express";
import { check } from "express-validator";
import { actualizarMedicos, borrarMedicos, crearMedicos, getMedicos } from "../controllers/medicos.controllers.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

export const router4 = Router();


router4.get('/',getMedicos)

router4.post('/',
[
    validarJWT,
    check('nombre','el nombre es necesario').notEmpty(),
    check('hospital','el id del hospital debe ser un id valido de mongo').isMongoId(),
    validarCampos
]
,crearMedicos)

router4.put('/:id',[
    validarJWT,
    check('nombre','el nombre es necesario').notEmpty(),
    validarCampos
],actualizarMedicos)

router4.delete('/:id',validarJWT,borrarMedicos)
