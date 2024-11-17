import express, {json} from 'express'


const app = express()
app.use(json())

const PORT = process.env.PORT || 3000


app.listen(PORT, ()=>{
    console.log("escuchando en el puerto")
})