import express, {json} from 'express'
import productRouter from './routes/products.js'
import cartRouter from './routes/cart.js'

const app = express()
app.use(json())

const PORT = process.env.PORT || 3000

//RUTAS
app.use('/products', productRouter)
app.use('/carts', cartRouter)

app.use((req, res)=>{
    res.status(400)
        .json({
            message: "Ruta no valida"
        })
})

app.listen(PORT, ()=>{
    console.log("escuchando en el puerto")
})