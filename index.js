import express from "express";
import "dotenv/config.js"
import { dbConnection } from "./database/config.js";
import cors from "cors";
import { router } from "./routes/usuarios.route.js";
import { router2 } from "./routes/auth.route.js";
import { router3 } from "./routes/hospitales.route.js";
import { router4 } from "./routes/medicos.route.js";
import { router5 } from "./routes/busquedas.route.js";
import { router6 } from "./routes/upload.route.js";




//crear servidor de express
const app = express();

//configurar cors

app.use(cors());

//carpeta publica

app.use(express.static('public'))

//lecutura y parseo del body

app.use(express.json());


//base de datos
dbConnection();



//rutas

app.use('/api/usuarios',router);
app.use('/api/hospitales',router3)
app.use('/api/medicos',router4)
app.use('/api/login',router2)
app.use('/api/todo',router5)
app.use('/api/upload',router6)





app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo en puerto' + process.env.PORT)
})