import {z} from "zod"

const CartScheme = z.object(
    {
        "usuario_id": z.number({
            invalid_type_error: "El usuario a introducir debe ser un numero",
            required_error: "El usuario_id es requerido"
        }).refine((value)=>{return value.toString().length < 11}, {message: "El numero no debe superar los 11 caracteres"}),

        "producto_id": z.number({
            invalid_type_error: "El producto a introducir debe ser un numero",
            required_error: "El producto_id es requerido"
        }).refine((value)=>{return value.toString().length < 11}, {message: "El producto no debe superar los 11 caracteres"}),

        "detalle_id": z.number({
            invalid_type_error: "El detalle a introducir debe ser un numero"
        }).refine((value)=>{return value.toString().length < 11}, {message: "El detalle id no debe superar los 11 caracteres"}).optional(),

        "cantidad": z.number({
            invalid_type_error: "La cantidad debe ser un numero"
        }).int({message: "Introduzca solo numeros enteros"}).refine((value)=>{return value.toString().length < 11}, {message: "la cantidad no debe superar los 11 caracteres"}).optional(),

        "fecha_agregado":  z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Debe ser una fecha válida en formato ISO 8601 ejemplo:2024-11-09T17:27:27.000Z",
          }),
    }
).strict()

export const validateCartSchema = (data) => CartScheme.safeParse(data);
export const validatePartialCartScheme = (data) => CartScheme.partial().safeParse(data) 