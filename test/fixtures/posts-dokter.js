const Post = require("../../src/database/post-dokter");
const posts = [
  {
    _id: "648166131779657bfc6d5e8c",
    nomor_registrasi: "A001",
    nama_dokter: "dr. Gus Arya",
    profesi: "Sp.Ak",
    jenis_kelamin: "Laki-Laki",
    email: "gusarya@gmail.com",
    nomor_telepon: "081888278019",
    alamat: "jl. kuta baru",
    jadwal_praktek: ["senin", "rabu", "jumat"],
  },
  {
    _id: "648166131779657bfc6d5e8d",
    nomor_registrasi: "A102",
    nama_dokter: "dr. Riska",
    profesi: "umum",
    jenis_kelamin: "perempuan",
    email: "riska@gmail.com",
    nomor_telepon: "081888356019",
    alamat: "jl. kuta raya",
    jadwal_praktek: ["selasa", "kamis", "jumat"],
  },
];
async function insertManyPosts() {
  await Post.insertMany(posts);
}
async function deleteManyPosts() {
  await Post.deleteMany({});
}

module.exports = {
  posts,
  insertManyPosts,
  deleteManyPosts,
};
