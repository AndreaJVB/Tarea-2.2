import {Router} from 'express'

const productRouter = Router()

productRouter.get('/')

productRouter.get('/:id')

productRouter.post('/')

productRouter.put('/:id')

productRouter.delete('/:id')

export default productRouter