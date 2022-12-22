import { Request, Response } from "express";

import { Order } from "../../models/Order";

export async function cancelOrder(req: Request, res: Response) {
	try {
		const { orderId } = req.params; // ID do pedido

		// Deletando o pedido através do ID
		await Order.findByIdAndDelete(orderId);

		res.sendStatus(204);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
