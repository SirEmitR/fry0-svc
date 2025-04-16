import  express from 'express';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import {  PORT } from './config.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
    ],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routesPath = path.resolve('routes');

fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.js')) {
        const routePath = path.join(routesPath, file);
        const routeModule = pathToFileURL(routePath).href;
        const route = `/${file.replace('.js', '')}`;
        import(routeModule).then((module) => {
            app.use(route, module.default);
            console.log(`Ruta cargada: ${route}`);
        }).catch((error) => {
            console.error(`Error al cargar la ruta ${route}:`, error);
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
