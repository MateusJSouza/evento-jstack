import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';

import { router } from './router';

mongoose.connect("mongodb://localhost:27017")
	.then(() => {
		const app = express();
		const port = 3001;

		/*
			Dizendo que os arquivos que estão dentro da pasta uploads são arquivos
			estáticos, passando o caminho relativo para o arquivo
		*/
		app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
		app.use(express.json()); // transforma em um objeto javascript
		app.use(router);

		app.listen(port, () => {
			console.log(`🚀 Server is running on http://localhost:${port}`);
		});
	})
	.catch(() => console.log('Erro ao conectar no mongodb'));
