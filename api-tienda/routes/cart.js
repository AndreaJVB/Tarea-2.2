import {Router} from "express"
import {CartController} from "../controllers/cartController.js"

const cartRouter = Router()

cartRouter.get('/:userId', CartController.getAllCartByUser)

cartRouter.post('/', CartController.addToCart)

cartRouter.delete('/:id', CartController.removeFromCart)

export default cartRouter