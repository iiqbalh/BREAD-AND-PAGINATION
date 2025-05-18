import { db } from './connect.js'

export class Data {
    constructor(id, name, height, weight, birthdate, married) {
        this.id = id
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.birthdate = birthdate;
        this.married = married;
    }

    static all(page, name, height, weight, stardate, enddate, married, operation, callback) {

        const params = [];
        const query = [];
        let sqlGet = "select count(*) as total from data";
        let sqlAll = "select * from data";

        if (name) {
            params.push('name like "%"||?||"%"');
            query.push(name);
        }

        if (height) {
            params.push('height = ?');
            query.push(height);
        }

        if (weight) {
            params.push('weight = ?');
            query.push(weight);
        }

        if (stardate && enddate) {
            params.push('birthdate between ? and ?');
            query.push(stardate, enddate);
        } else if (stardate) {
            params.push('birthdate >= ?');
            query.push(stardate);
        } else if (enddate) {
            params.push('birthdate <= ?');
            query.push(enddate);
        }

        if (married) {
            params.push('married = ?');
            query.push(married);
        }

        if (params.length > 0) {
            sqlGet += ` where ${params.join(` ${operation} `)}`;
            sqlAll += ` where ${params.join(` ${operation} `)}`;
        }

        const limit = 5;
        const offset = (page - 1) * limit;
        db.get(sqlGet, query, (err, rows) => {
            if (err) return console.log(err);
            const total = rows.total;
            const pages = Math.ceil(total / limit);

            sqlAll += ` order by id limit ? offset ?`;
            query.push(limit, offset);

            db.all(sqlAll, query, (err, rows) => {
                if (err) return console.log(err);
                callback(rows, pages, offset);
            })
        })
    }

    static create(name, height, weight, birthdate, married, callback) {
        db.run("insert into data (name, height, weight, birthdate, married) values (?, ?, ?, ?, ?)",
            [name, height, weight, birthdate, married], (err) => {
                if (err) return console.log(err);
                callback();
            })
    }

    static get(id, callback) {
        db.get("select * from data where id = ?", [id], (err, rows) => {
            if (err) return console.log(err);
            callback(rows);
        })
    }

    static update(name, height, weight, birthdate, married, id, callback) {
        db.run("update data set name = ?, height = ?, weight = ?, birthdate = ?, married = ? where id = ?",
            [name, height, weight, birthdate, married, id], (err) => {
                if (err) return console.log(err);
                callback();
            })
    }

    static remove(id, callback) {
        db.get("delete from data where id = ?", [id], (err) => {
            if (err) return console.log(err);
            callback();
        })
    }
}