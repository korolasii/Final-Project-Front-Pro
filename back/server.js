import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './db/database.js';
import itemsCarouselRoutes from './routes/itemsCarousel.js';
import itemsModelRowRoutes from './routes/itemsModelRow.js';
import itemsCarouselModelRoutes from './routes/itemsCarouselModel.js';
import itemsPorscheWorldRoutes from './routes/itemsPorscheWorld.js';
import users from './routes/users.js'
import drive from './routes/drive.js'
import body from './routes/body.js'
import fuel from './routes/fuel.js'
import model from './routes/model.js'
import transmission from './routes/transmission.js'
import model_configuration from './routes/model_configuration.js'
import menu_search from './routes/menu_search.js'

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/items-carousel', itemsCarouselRoutes);
app.use('/items-model-row', itemsModelRowRoutes);
app.use('/items-carousel-model', itemsCarouselModelRoutes);
app.use('/items-porsche-world', itemsPorscheWorldRoutes);
app.use('/user', users);
app.use('/drive', drive);
app.use('/body', body);
app.use('/fuel', fuel);
app.use('/model', model);
app.use('/transmission', transmission);
app.use('/model_configuration', model_configuration);
app.use('/menu_search', menu_search);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
