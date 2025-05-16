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

    save(callback = function () { }) {
        if (this.id) {
            db.run("update data set name = ?, set height = ?, set weight = ?, set birthdate = ?, where id = ?",
                [this.name, this.height, this.weight, this.birthdate, this.married, this.id], (err) => {
                    if (err) return console.log(err);
                    callback()
                })
        } else {
            db.run("insert into data (name, height, weight, birthdate) values (?, ?, ?, ?)",
                [this.name, this.height, this.weight, this.birthdate, this.married], (err) => {
                    if (err) return console.log(err);
                    callback()
                })
        }
    }

    static all(callback) {
        db.all("select * from data", (err, rows) => {
            if (err) return console.log(err);
            callback(rows)
        })
    }

    static create(name, height, weight, birthdate, married, callback) {
        db.run("insert into data (name, height, weight, birthdate, married) values (?, ?, ?, ?, ?)",
            [name, height, weight, birthdate, married], (err) => {
                if (err) return console.log(err);
                callback()
            })
    }

    static get(id, callback) {
        db.get("select * from data where id = ?", [id], (err, rows) => {
            if (err) return console.log(err);
            callback(rows)
        })
    }

    static update(name, height, weight, birthdate, married, id, callback) {
        db.run("update data set name = ?, set height = ?, set weight = ?, set birthdate = ?, set married = ?, where id = ?",
            [name, height, weight, birthdate, married, id], (err) => {
                if (err) return console.log(err);
                callback()
            })
    }

    static remove(id, callback) {
        db.run("delete from data where id = ?", [id], (err) => {
            if (err) return console.log(err);
            callback()
        })
    }
}