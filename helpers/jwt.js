import jwt from "jsonwebtoken";

export const generarJWT= (uid)=>{

    return new Promise((resolve, rejected)=>{
        const payload = {
            uid
        }
        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:'12h'
        },(err,token)=>{
            if(err) rejected('no se pudo generar el JWT')
            resolve(token)

            
        });
    });
   

}