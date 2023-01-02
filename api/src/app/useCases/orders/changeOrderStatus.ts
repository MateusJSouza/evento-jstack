import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function changeOrderStatus(req: Request, res: Response) {
	try {
		const { orderId } = req.params; // ID do pedido
		const { status } = req.body; // Status do pedido

		// Verificando se o status está dentro do array de espera, em produção ou feito
		if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
			return res.status(400).json({
				error: 'Status should be one of these: WAITING, IN_PRODUCTION or DONE',
			})
		}

		// Buscando um ID e atualiza o status setando o novo status vindo do req.body
		await Order.findByIdAndUpdate(orderId, { status })

		res.status(204);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
