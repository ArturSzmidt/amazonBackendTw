import express from 'express';
import cors from 'cors';
import { join } from 'path';
import { getCurrentFolderPath } from './lib/fs-tools.js';
import listEndpoints from 'express-list-endpoints';

/* import new routers */
import reviewsRouter from './services/reviews/index.js';
import productsRouter from './products/index.js';

const server = express();

const PORT = 3001;

const publicFolderPath = join(
  getCurrentFolderPath(import.meta.url),
  '../public'
);

server.use(cors());
server.use(express.static(publicFolderPath));
server.use(express.json());
server.use('/reviews', reviewsRouter);

server.use('/products', productsRouter);

console.table(listEndpoints(server));

server.listen(PORT, () => console.log('✅ Server is running on port : ', PORT));
server.on('error', (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);
