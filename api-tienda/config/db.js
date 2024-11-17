import mysql from 'mysql2';
import 'dotenv/config';

const connection = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
)

connection.connect((error)=>
    {
        if(error)
            {
                throw new Error("Error en la conexion de base de datos")
            }
    })

export default connection