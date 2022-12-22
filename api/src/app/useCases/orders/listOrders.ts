import { Request, Response } from "express";

import { Order } from "../../models/Order";

export async function listOrders(req: Request, res: Response) {
	try {
		// Populando o meu product para ele todas as outras informações do produto
		const orders = await Order.find()
			// Sorteando os pedidos, deixando o pedido mais antigo acima dos outros
			.sort({ createdAt: 1 })
			.populate('products.product');

		res.json(orders);
	} catch(error) {
		console.log(error);
		res.sendStatus(500);
	}
}
