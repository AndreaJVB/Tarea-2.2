import { error } from "console";
import connection from "../config/db.js";
import {validateCartSchema} from "../schemas/carts_schema.js"

export class CartController{

    /**
     * METODO GET QUE DEVUELVE LOS PRODUCTOS POR EL USUARIO
     */
    static getAllCartByUser (req, resp){
        const {userId} = req.params

        try{

            const consult = "SELECT * FROM carrito WHERE usuario_id = ?"

            connection.query(consult, [userId], (error, results)=>{
                if(error){
                return resp.status(400)
                        .json({
                            message: "Hubo un error en la consulta del carrito"
                        })
                }

                if(results && results.length == 0){
                    return resp.status(404)
                        .json({
                            message: "No se encontro coincidencia"
                        })
                }

                resp.status(200)
                    .header("Content-Type", "application/json")
                    .json(results)
            })

        }catch(e){
            return resp.status(400)
                .json({
                    error: true,
                    message: e.message
                })
        }

    }
    /**
     * POST: Agregar productos al carrito
     */

    static addToCart(req, resp){
        const data = req.body

        const {success, error} = validateCartSchema(data)

        if(!success){
            return resp.status(400)
                .json({
                    message: "Error en la validacion"
                })
        }

        const consult = "INSERT INTO carrito (`usuario_id`, `producto_id`, `detalle_id`, `cantidad`, `fecha_agregado`) VALUES (?, ?, ?, ?, ?)"

        try{

            const {usuario_id, producto_id, detalle_id, cantidad, fecha_agregado} = data

            connection.query(consult, [usuario_id, producto_id, detalle_id, cantidad, fecha_agregado], (error, results)=>{
                if(error){
                    if(error.code = "ER_NO_REFERENCED_ROW_2"){
                        return resp.status(400)
                        .json({
                            message: "Error en agregar el producto. Usuario, detalle o producto no existen"
                        })
                    }
                    return resp.status(400)
                        .json({
                            message: "Error en agregar el producto"
                        })
                }

            return resp.status(201)
            .header("Content-Type", "application/json")
            .json(data)

            })

        }catch(e){
            return resp.status(400)
                .json({
                    error: true,
                    message: e.message
                })
        }
    }

     /**
     * DELETE: Borrar producto del carrito
     */

     static removeFromCart(req, resp){
        const {id} = req.params

        const consult = "DELETE FROM carrito WHERE id = ?"

        try{
            connection.query(consult, [id], (error, result)=>{
                if(error){
                    return resp.status(400)
                        .json({
                            message: "Error en la eliminacion del producto"
                        })
                }

                if(result.affectedRows ===0){
                    return resp.status(404)
                        .json({
                            message: "No se encontro el producto a eliminar"
                        })
                }

                return resp.status(200)
                    .json({
                        message: "Producto eliminado con exito"
                    })
            })

        }catch(e){
            return resp.status(400)
                .json({
                    error: true,
                    message: e.message
                })
        }

    }
}