import express from 'express';
import { json } from 'body-parser';


// rutas
import { apiRoutes } from './routes/api-routes';

const app = express();

app.use(json());

app.use(apiRoutes);

app.listen(3000, () => {
    console.log('Listening in port 3000!');

});
