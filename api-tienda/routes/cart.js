import {Router} from "express"

const cartRouter = Router()

cartRouter.get('/:userId')

cartRouter.post('/')

cartRouter.delete('/:id')

export default cartRouter