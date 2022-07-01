import { Router } from "express";
import { actualizarUsuarios, borrarUsuario, crearUsuarios, getUsuarios } from "../controllers/usuarios.controllers.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

export const router = Router();

router.get('/',validarJWT,getUsuarios);

router.post('/',
[check('nombre','el nombre es obligatorio').not().isEmpty(),
 check('password','el password es obligatorio').not().isEmpty(),
 check('email','el email es obligatorio').isEmail(),
 validarCampos
]
,crearUsuarios)

router.put('/:id',
validarJWT,
[check('nombre','el nombre es obligatorio').not().isEmpty(),
check('email','el email es obligatorio').isEmail(),
check('role','el role es obligatorio').not().isEmpty(),
validarCampos,
]
,actualizarUsuarios)

router.delete('/:id',validarJWT,borrarUsuario)