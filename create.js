const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('report.db');

/*let schema = `
create table member(
  id integer primary key,
  name text not null,
  class integer not null
);
`
*/

/*
let schema = `
create table prof(
  id integer primary key,
  pref text not null,
  birth text not null
);
`
*/


let schema = `
create table single(
  id integer primary key,
  title text not null,
  release text not null
);
`

db.serialize( () => {
	db.run( schema, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "テーブルを作成しました" );
	});
});
