import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

// Initialize db
const db = new LowSync(new JSONFileSync('./src/data/db.json'), {});

const getData = (key) => {
  db.read();
  return db.data[key];
};

const setData = (key, data) => {
  db.read();
  db.data[key] = data;
};

export {
  getData,
  setData,
};
