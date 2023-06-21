const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let sql = `
select drink.id, drink.name, maker.name as name2 from drink inner join maker on drink.maker_id = maker.id;
`

db.serialize(() => {
  db.all(sql, (error, row) => {
    if (error) {
      console.log('Error: ', error);
      return;
    }
    for (let data of row) {
      console.log(data.id + ' : ' + data.name + ' : ' + data.name2);
    }
  });
});
