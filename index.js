const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  user: "b5c61f56416932",
  host: "eu-cdbr-west-03.cleardb.net",
  password: "e88a094a",
  database: "heroku_449dc46110b4cb9",
});
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const sku = req.body.sku;
  const price = req.body.price;
  const kg = req.body.kg;
  const mb = req.body.mb;
  const width = req.body.width;
  const height = req.body.width;
  const length = req.body.length;

  db.query(
    "INSERT INTO products (name,sku,price,kg,mb,width,height,length) VALUES(?,?,?,?,?,?,?,?)",
    [name, sku, price, kg, mb, width, height, length],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:sku", (req, res) => {
  const sku = req.params.sku.split(",");
  const ins = new Array(sku.length).fill("?").join();

  db.query(`DELETE FROM products WHERE sku IN (${ins})`, sku, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
