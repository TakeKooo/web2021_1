const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('report.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const message = "乃木坂46";
  res.render('show', { mes: message });
});

app.get("/member", (req, res) => {
  db.serialize(() => {
    db.all("select member.id as id, member.name as name, member.class as class, prof.pref as pref, prof.birth as birth from member inner join prof on member.id = prof.id;", (error, row) => {
      if (error) {
        res.render('show', { mes: "エラーです" });
      }
      res.render('select', { data: row });
    })
  })
})

app.get("/single", (req, res) => {
  db.serialize(() => {
    db.all("select id, title, release from single;", (error, row) => {
      if (error) {
        res.render('show', { mes: "エラーです" });
      }
      res.render('single', { data: row });
    })
  })
})

app.post("/insert_member", (req, res) => {
  let sql = `
insert into member ("name","class") values ("` + req.body.name + `",` + req.body.class +` );
`
  console.log(sql);
  db.serialize(() => {
    db.run(sql, (error, row) => {
      console.log(error);
      if (error) {
        res.render('show', { mes: "エラーです" });
      }
      res.redirect('public/insert_prof.html');
    });
  });
  console.log(req.body);
});

app.post("/insert_prof", (req, res) => {
  let sql = `
insert into prof ("pref","birth") values ("` + req.body.pref + `","` + req.body.birth +`" );
`
  console.log(sql);
  db.serialize(() => {
    db.run(sql, (error, row) => {
      console.log(error);
      if (error) {
        res.render('show', { mes: "エラーです" });
      }
      res.redirect('/member');
    });
  });
  console.log(req.body);
});

app.post("/insert_single", (req, res) => {
  let sql = `
insert into single ("title","release") values ("` + req.body.title + `","` + req.body.release + `");
`
  console.log(sql);
  db.serialize(() => {
    db.run(sql, (error, row) => {
      console.log(error);
      if (error) {
        res.render('show', { mes: "エラーです" });
      }
      res.redirect('/single');
    });
  });
  console.log(req.body);
});

app.get("/sort", (req, res) => {
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql =`select member.id as id, member.name as name, member.class as class, prof.pref as pref, prof.birth as birth from member inner join prof on member.id = prof.id where pref = "` + req.query.pref +`";`;
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('search', {data:data});
        })
    })
})

app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
