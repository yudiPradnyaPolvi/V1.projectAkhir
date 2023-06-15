const express = require("express");
const app = express.Router();

const cookieSessionCtrl = require("./controller/cookie-session");
const postDokterCtrl = require("./controller/postDokter");
const postPasienCtrl = require("./controller/postPasien");
const checkBmiCtrl = require("./controller/checkBmi");
//const auth = require("./middleware/auth");

// const bagiMiddleware = (req, res, next) => {
//   if (req.query.angka2 == 0) {
//     res.send({ message: "tidak bisa dibagi dengan 0" });
//   } else {
//     next();
//   }
// };

app.get("/", function (req, res) {
  res.send({ message: "hello dari route v1" });
});

app.get("/set-cookie", cookieSessionCtrl.setCookie);
app.get("/get-cookie", cookieSessionCtrl.getCookie);
app.get("/set-session", cookieSessionCtrl.setSession);
app.get("/get-session", cookieSessionCtrl.getSession);

// ================= Dokter =================
app.get("/gets-Dokter", postDokterCtrl.getPosts);
app.post("/posts-Dokter", postDokterCtrl.addPosts);
app.get("/getsone-Dokter/:id", postDokterCtrl.getOnePost);
app.put("/edit-Dokter/:id", postDokterCtrl.updateOne);
app.delete("/delete-Dokter/:id", postDokterCtrl.deleteOne);
// ================= Pasien =================
app.get("/gets-Pasien", postPasienCtrl.getPosts);
app.post("/posts-Pasien", postPasienCtrl.addPosts);
app.get("/getsone-Pasien/:id", postPasienCtrl.getOnePost);
app.put("/edit-Pasien/:id", postPasienCtrl.updateOne);
app.delete("/delete-Pasien/:id", postPasienCtrl.deleteOne);

// ================= check bmi =================
app.post("/postcheck-Bmi", checkBmiCtrl.addPosts);

// header
app.get("/get-headers", (req, res) => {
  const headers = req.headers;
  res.send({ headers });
});
app.get("/set-headers", (req, res) => {
  res.header("x-backend", "productzilla-b5");
  res.send({ message: "header sent" });
});

module.exports = app;
