import { Router } from "express";
import { googleSingIn, login, renewToken } from "../controllers/auth.controllers.js";
import { check } from 'express-validator'
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

export const router2 = Router();

router2.post('/',
[
    check('email','el email es obligatorio').isEmail(),
    check('password','el password es obligatorio').not().isEmpty(),
    validarCampos
]
,login)

router2.post('/google',
[
    check('token','el token de google es obligatorio').not().isEmpty(),
    validarCampos
]
,googleSingIn)

router2.get('/renew',validarJWT,
renewToken

)