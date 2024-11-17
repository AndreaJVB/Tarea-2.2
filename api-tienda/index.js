import express, {json} from 'express'
import productRouter from './routes/products.js'

const app = express()
app.use(json())

const PORT = process.env.PORT || 3000

//RUTAS
app.use('/products', productRouter)


app.listen(PORT, ()=>{
    console.log("escuchando en el puerto")
})