import { Data } from "../models/Data.js";

export function getData(req, res) {
    const { page = 1, name, height, weight, stardate, enddate, married, operation} = req.query;
    const url = req.url === '/' ? '/?page=1' : req.url;

    Data.all(page, name, height, weight, stardate, enddate, married, operation, (data, pages, offset) => {
        res.render('read', { data, pages, offset, page, url, query: req.query });
    })
}

export function getDataForm(req, res) {
    const header = 'Adding Data';
        res.render('form', { data: {}, header});
}

export function addData(req, res) {
    Data.create(req.body.name, req.body.height, req.body.weight, req.body.date, req.body.married, () => {
        res.redirect('/');
    })
}

export function getUpdate(req, res) {
    const id = req.params.id;
    const header = 'Updating Data';
    Data.get(id, (data) => {
        res.render('form', { data, header });
    })
}

export function updateData(req, res) {
    const id = req.params.id;
    Data.update(req.body.name, req.body.height, req.body.weight, req.body.date, req.body.married, id, () => {
        res.redirect('/');
    })
}

export function removeData(req, res) {
    const id = req.params.id;
    Data.remove(id, () => {
        res.redirect('/');
    })
}
