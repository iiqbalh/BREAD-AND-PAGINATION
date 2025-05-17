import { Data } from "../models/Data.js"

export function getData(req, res) {
    const page = req.query.page || 1;
    Data.all(page, (data, pages, offset) => {
        res.render('read', { data, pages, offset, page })
    })
}

export function getDataForm(req, res) {
    const header = 'Adding Data';
    Data.all((data) => {
        res.render('form', { data, header})
    })
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
        res.render('form', { data, header })
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
