const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql = `
delete from example where id is null;
`

db.serialize( () => {
	db.run( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "データを削除しました" );
	});
});
