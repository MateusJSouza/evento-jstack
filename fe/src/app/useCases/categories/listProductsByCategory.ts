import { Request, Response } from "express";

import { Product } from "../../models/Product";

export async function listProductsByCategory(req: Request, res: Response) {
	// Listagem de produtos
	try {
		const { categoryId } = req.params;
		/*
			Listar todos os meus produtos onde a categoria for igual a categoria que
			estou recebendo nos meus paths
		*/
		const products = await Product.find().where('category').equals(categoryId);

		res.json(products);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
