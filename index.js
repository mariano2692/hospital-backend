import express from "express";
import "dotenv/config.js"
import { dbConnection } from "./database/config.js";
import cors from "cors";



//crear servidor de express
const app = express();

//configurar cors

app.use(cors());


//base de datos
dbConnection();



//rutas

app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg:'hola mundo'
    })

})









app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo en puerto' + process.env.PORT)
})