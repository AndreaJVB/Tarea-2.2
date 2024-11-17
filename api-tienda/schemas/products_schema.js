import {z} from 'zod'
import { parseDate } from '../otros/parseDate.js'

const ProductSchema = z.object(
    {
        "nombre": z.string({
            invalid_type_error: "El nombre debe ser caracteres",
            required_error: "se requiere un nombre de producto"
        }).max(100, {
            message: "El maximo es de 100 caracteres"
        }),

        "descripcion": z.string({
            invalid_type_error: "Introduzca solo caracteres"
        }).optional(),

        "precio": z.number({
            required_error: "El precio e requerido",
            invalid_type_error: "El precio debe ser un numero"
        }).refine((value)=>{
            return value.toString().length < 10
        }, {message: "El valor no puede ser mas de 10 caracteres"}),

        "stock": z.number({
            invalid_type_error: "El stock debe ser un numero"
        }).refine((value)=>{
            return value.toString().length < 11
        }, {message: "El valor no puede ser mas de 10 caracteres"}).optional(),

        "categoria": z.string({
            invalid_type_error: "La categoria debe ser caracteres"
        }).max(50, {
            message: "Se sobrepaso los caracteres maximo en el campo de categorias"
        }).optional(),

        "fecha_creacion": z.string({
            invalid_type_error: "La fecha no tiene el formato adecuado"
          })
            .refine((value) => {
              const date = parseDate(value);
              return date !== null;
            }, {
              message: "La fecha debe estar en el formato 'YYYY-MM-DD HH:mm:ss'",
            })
            .transform((value) => parseDate(value)).optional()
    }
).strict()

export const validateProductSchema = (product) => ProductSchema.safeParse(product)

export const validatePartialSchema = (product) => ProductSchema.partial().safeParse(product)