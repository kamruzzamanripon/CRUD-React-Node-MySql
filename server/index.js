const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "mysqlcrud",
});

app.get("/", (req, res)=>{
    res.send("hello world, Ripon");
})

//Todo Create
app.post("/create", (req, res) => {
    const todo =  req.body.todo;
    const priority =  req.body.priority;
   
    db.query(
      "INSERT INTO todos (todo, priority) VALUES (?,?)",
      [todo, priority],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });

  //All Todo List fecth
  app.get("/all", (req, res) => {
    db.query("SELECT * FROM todos", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  //Todo Delete
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM todos WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  //Todo Update
  app.put("/update", (req, res) => {
    const id = req.body.id;
    const priority = req.body.priority;
    db.query(
      "UPDATE todos SET priority = ? WHERE id = ?",
      [priority, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });



  app.listen(4000, () => {
    console.log("Yey, your server is running on port 4000");
  });
  