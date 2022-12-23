import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';
import http from 'node:http';

import { router } from './router';

const app = express();
const server = http.createServer(app);

mongoose.connect('mongodb://localhost:27017')
	.then(() => {
		const port = 3001;

		app.use((req, res, next) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', '*'); // * = WILDCARD
			res.setHeader('Access-Control-Allow-Headers', '*');

			next();
		});
		/*
			Dizendo que os arquivos que estão dentro da pasta uploads são arquivos
			estáticos, passando o caminho relativo para o arquivo
		*/
		app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
		app.use(express.json()); // transforma em um objeto javascript
		app.use(router);

		server.listen(port, () => {
			console.log(`🚀 Server is running on http://localhost:${port}`);
		});
	})
	.catch(() => console.log('Erro ao conectar no mongodb'));
