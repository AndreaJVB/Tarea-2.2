import {Router} from 'express'
import { ProductsController } from '../controllers/productController.js'

const productRouter = Router()

productRouter.get('/', ProductsController.getAllProducts)

productRouter.get('/:id', ProductsController.getProductById )

productRouter.post('/', ProductsController.crateProduct)

productRouter.put('/:id', ProductsController.updateProduct)

productRouter.delete('/:id', ProductsController.deleteProduct)

export default productRouter