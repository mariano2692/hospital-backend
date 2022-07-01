import express from "express";
import "dotenv/config.js"
import { dbConnection } from "./database/config.js";
import cors from "cors";
import { router } from "./routes/usuarios.route.js";
import { router2 } from "./routes/auth.route.js";




//crear servidor de express
const app = express();

//configurar cors

app.use(cors());

//lecutura y parseo del body

app.use(express.json());


//base de datos
dbConnection();



//rutas

app.use('/api/usuarios',router);
app.use('/api/login',router2)





app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo en puerto' + process.env.PORT)
})