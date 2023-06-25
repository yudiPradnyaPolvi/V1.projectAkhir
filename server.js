require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");

const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");

const routerv1 = require("./src/application/v1.routes");

const db = require("./src/database");

function server() {
  db.connect().catch(console.log);

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  app.use(
    cors({
      // origin: '*', // semua url bisa akses
      // origin: ['http://localhost:3001', 'http://localhost:3000'], // url khusus
      origin: "*",
    })
  );
  app.use(cookieParser());
  app.use(
    session({
      secret: "abcdefghijklmnopqrstuvwxyz",
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const swaggerDocument = yaml.load(
    fs.readFileSync("./src/swagger/swagger.yaml", "utf-8")
  );

  app.use("/", routerv1);
  app.use("/api/v1", routerv1);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get("/chat", (req, res) => {
    res.sendFile(_dirname + "/public/chat.html");
  });
  app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send({ message: "terjadi kesalahan! :(" });
  });

  return server;
}
module.exports = {
  server,
};
