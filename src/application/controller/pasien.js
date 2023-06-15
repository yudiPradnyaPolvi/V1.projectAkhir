const fs = require("fs");
const path = require("path");
const dbPath = path.resolve(__dirname, "./postsPasien.json");

function getData() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
  }
  let data = fs.readFileSync(dbPath);
  data = data.toString("utf-8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data), { encoding: "utf-8" });
}

function fetch() {
  let data = getData();
  return data;
}

function getOne(id) {
  let data = getData();
  return data.find((d) => d.id == id);
}

function create(bodyData) {
  let data = getData();
  data.push(bodyData);
  writeData(data);
  return bodyData;
}

function update(bodyData, id) {
  let data = getOne(id);
  let allData = fetch();
  data = { ...data, ...bodyData };
  const index = allData.findIndex((d) => d.id == id);
  if (!index || !data) {
    throw Error("data tidak ditemukan");
  }
  allData[index] = data;
  writeData(allData);
  return data;
}

function destroy(id) {
  let data = fetch();
  data = data.filter((d) => d.id != id);
  writeData(data);
}

module.exports = {
  fetch,
  create,
  getOne,
  update,
  destroy,
};
