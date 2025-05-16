import sqlite3 from 'sqlite3';
import path from 'path';
const dbpath = path.join(path.resolve(), 'data', 'data.db');
export const db = new sqlite3.Database(dbpath);
