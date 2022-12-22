import { Router } from "express";
import multer from "multer";
import path from 'node:path';
import { createCategory } from "./app/useCases/categories/createCategory";
import { listCategories } from "./app/useCases/categories/listCategories";
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategory";
import { cancelOrder } from "./app/useCases/orders/cancelOrder";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { createOrder } from "./app/useCases/orders/createOrder";
import { listOrders } from "./app/useCases/orders/listOrders";
import { createProduct } from "./app/useCases/products/createProduct";
import { listProducts } from "./app/useCases/products/listProducts";

// PUT -> alteração completa
// PATCH -> alteração parcial no objeto

export const router = Router();

// Fazendo o upload das imagens e salvando na pasta de uploads
const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, path.resolve(__dirname, '..', 'uploads'));
		},
		/*
			Adicionando o Date.now() para ser gerado um timestamp para cada upload
			para não gerarem arquivos com o mesmo nome e o file.originalname para
			pegar o nome original do arquivo
		*/
		filename(req, file, callback) {
			callback(null, `${Date.now()}-${file.originalname}`);
		},
	})
})

// List categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategory)

// List products
router.get('/products', listProducts);

// Create product
/*
	single() faz o upload somente de um arquivo passando o nome da propriedade
	que está vindo na request
*/
router.post('/products', upload.single('image'), createProduct);

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// List orders
router.get('/orders', listOrders);

// Create order
router.post('/orders', createOrder);

// Change order status
router.patch('/orders:orderId', changeOrderStatus);

// Delete/cancel order
router.delete('/orders/:orderId', cancelOrder);
