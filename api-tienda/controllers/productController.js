import connection from "../config/db.js";
import { validateProductSchema, validatePartialSchema } from "../schemas/products_schema.js";

export class ProductsController {

    static getAllProducts(req, res)  //Retorna la toda la lista
    {
        const consult = "SELECT * FROM productos"

        try
        {
            connection.query(consult, (error, results)=>{

                if(error){
                    return res.status(400)
                        .json({message: "Error en la consulta"})
                }

                return res
                .header('Content-Type', 'application/json')
                .status(200)
                .json(results)

            })
        }catch(e)
        {
            return res.status(400)
            .json("Error en la obtencion de los datos", e)
        }
    }
    
    static getProductById (req, resp){  //Obtencion de productos por _id
        const {id} = req.params

        const consult = "Select * from productos WHERE id = ?"

        try{
            connection.query(consult, [id], (error, result)=>{
                if(error){
                    return resp.status(400)
                            .json({message: "Error al obtener los datos"})
                }
                if(result && result.length == 0 ){
                    return resp.status(400)
                        .json({message: "No se encontro el producto"})
                }

                return resp.status(201)
                    .header('Content-Type', 'application/json')
                    .json(result)

            })
        }catch(e){
            return resp.status(400)
            .json({message: e})
        }
        
    }

    /**
     * Metodo Post para guardar productos
     */

    static crateProduct(req, resp)
    {
        const data = req.body

        const {success, error} = validateProductSchema(data)

        if(!success){
            resp.status(400)
            .json({
                message: JSON.parse(error.message)
            })
        }

        const consult = "INSERT INTO productos (nombre, descripcion, precio, stock, categoria, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?)"

        try{
            const {nombre, descripcion, precio, stock, categoria, fecha_creacion} = data

            connection.query(consult, [nombre, descripcion, precio, stock, categoria, fecha_creacion], (error, results)=>{

                if(error){
                    return resp.status(400)
                    .json({message: "Error en la creacion de los datos"})
                }

                return resp.status(201)
                    .header('Content-Type', 'application/json')
                    .json(data)

            })
        }catch(e){
            return resp.status(400)
                .json({
                    error: true,
                    message: "Error en la creacion"
                })
        }   
    }
}