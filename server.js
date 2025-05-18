import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { addData, getData, getDataForm, getUpdate, removeData, updateData } from './controllers/dataControllers.js';

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(path.resolve(), 'public')));


app.get('/', getData);

app.get('/add', getDataForm);

app.post('/add', addData);

app.get('/edit/:id', getUpdate);

app.post('/edit/:id', updateData);

app.get('/delete/:id', removeData);

app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});

