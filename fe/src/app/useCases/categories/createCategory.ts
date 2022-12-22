import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function createCategory(req: Request, res: Response) {
	try {
		// Desestruturando o ícone e o nome do body da requisição
		const { icon, name } = req.body;

		if (!name) {
			return res.status(400).json({
				error: 'Name is required',
			})
		}

		// Criação de categorias
		const category = await Category.create({ icon, name });

		res.status(201).json(category);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
