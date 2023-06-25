const supertest = require("supertest");
const { app } = require("../app");
const { disconnect } = require("mongoose");
const {
  insertManyPosts,
  deleteManyPosts,
} = require("../fixtures/posts-dokter");

describe("tests/e2e/dokter.spec.js", () => {
  beforeAll(() => {
    //dieksekusi sebelum semua test berjalan
  });
  beforeEach(async () => {
    //dieksekusi sebelum setiap test berjalan
    await deleteManyPosts();
    await insertManyPosts();
  });

  afterEach(async () => {
    //dieksekusi setelah setiap test berjalan
    //await deleteManyPosts();
  });

  describe("GET /dokter", () => {
    //do testing
    it("should return all posts when data exists", async () => {
      //request posts
      const posts = await supertest(app).get("/dokter");
      expect(posts.body).toHaveLength(4);
      expect(posts.body.status).toBe(200);
      //expect(posts).toBeDefinded();
    });
  });

  describe("POST /dokter", () => {
    //do testing positif
    it("should return inserted post when data inserted", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nomor_registrasi: "A003",
          nama_dokter: "dr. Surya Giri",
          profesi: "umum",
          jenis_kelamin: "Laki-Laki",
          email: "surya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kori nuansa",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.body.status).toBe(200);
      expect(posts.body.nomor_registrasi).toBe("A003");
      expect(posts.body.nama_dokter).toBe("dr. Surya Giri");
      expect(posts.body.profesi).toBe("umum");
      expect(posts.body.jenis_kelamin).toBe("Laki-Laki");
      expect(posts.body.email).toBe("surya@gmail.com");
      expect(posts.body.nomor_telepon).toBe("081777278020");
      expect(posts.body.alamat).toBe("jl. kori nuansa");
      expect(posts.body.jadwal_praktek).toBe(["selasa", "rabu", "sabtu"]);
    });

    // field masih ada kosong
    it("should return error nomor_registrasi validation when nomor_registrasi not filled'", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nama_dokter: "dr. Surya Giri",
          profesi: "umum",
          jenis_kelamin: "Laki-Laki",
          email: "surya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kori nuansa",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("nomor registrasi harus diisi ");
    });
    it("should return error nama_dokter validation when nama_dokter not filled'", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nomor_registrasi: "A003",
          profesi: "umum",
          jenis_kelamin: "Laki-Laki",
          email: "surya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kori nuansa",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("nama dokter harus diisi ");
    });
    it("should return error profesi validation when profesi not filled'", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nomor_registrasi: "A003",
          nama_dokter: "dr. Surya Giri",
          jenis_kelamin: "Laki-Laki",
          email: "surya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kori nuansa",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("profesi harus diisi ");
    });
    it("should return error jenis_kelamin validation when jenis_kelamin not filled'", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nomor_registrasi: "A003",
          nama_dokter: "dr. Surya Giri",
          profesi: "umum",
          email: "surya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kori nuansa",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("jenis kelamin harus diisi ");
    });
    it("should return error email validation when email not filled'", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nomor_registrasi: "A003",
          nama_dokter: "dr. Surya Giri",
          profesi: "umum",
          jenis_kelamin: "Laki-Laki",
          nomor_telepon: "081777278020",
          alamat: "jl. kori nuansa",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("email harus diisi ");
    });
    it("should return error nomor_telepon validation when nomor_telepon not filled'", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nomor_registrasi: "A003",
          nama_dokter: "dr. Surya Giri",
          profesi: "umum",
          jenis_kelamin: "Laki-Laki",
          email: "surya@gmail.com",
          alamat: "jl. kori nuansa",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("nomor telepon harus diisi ");
    });
    it("should return error alamat validation when alamat not filled'", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nomor_registrasi: "A003",
          nama_dokter: "dr. Surya Giri",
          profesi: "umum",
          jenis_kelamin: "Laki-Laki",
          email: "surya@gmail.com",
          nomor_telepon: "081777278020",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("alamat harus diisi ");
    });
    it("should return error jadwal validation when jadwal not filled'", async () => {
      const posts = await supertest(app).post("/dokter").send({
        nomor_registrasi: "A003",
        nama_dokter: "dr. Surya Giri",
        profesi: "umum",
        jenis_kelamin: "Laki-Laki",
        email: "surya@gmail.com",
        nomor_telepon: "081777278020",
        alamat: "jl. kori nuansa",
      });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("jadwal harus diisi ");
    });

    it("should return when all field are not field", async () => {
      const posts = await supertest(app).post("/dokter").send({});
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("Semua harus diisi ");
    });
  });
  describe("GET /dokter/:id", () => {
    //do testing
    it("should return one posts when data exists", async () => {
      //request posts
      const posts = await supertest(app).get("/dokter/"); // kurang id ambil dari databas
      expect(posts.body.status).toBe(200);
      expect(posts.body.statusCode).toBe(200);

      expect(posts.body).toHaveProperty("nomor_registrasi");
      expect(posts.body).toHaveProperty("nama_dokter");
      expect(posts.body).toHaveProperty("profesi");
      expect(posts.body).toHaveProperty("jenis_kelamin");
      expect(posts.body).toHaveProperty("email");
      expect(posts.body).toHaveProperty("nomor_telepon");
      expect(posts.body).toHaveProperty("alamat");

      expect(posts.body.nomor_registrasi).toBe("A001");
      expect(posts.body.nama_dokter).toBe("dr. Gus Arya");
      expect(posts.body.profesi).toBe("Sp.Ak");
      expect(posts.body.jenis_kelamin).toBe("Laki-Laki");
      expect(posts.body.email).toBe("gusarya@gmail.com");
      expect(posts.body.nomor_telepon).toBe("081777278020");
      expect(posts.body.alamat).toBe("jl. kuta baru");
      //expect(posts).toBeDefinded();
    });
    it("should return not found error when data is not exists", async () => {
      //request posts
      const posts = await supertest(app).get("/dokter/"); // kurang id ambil dari database
      expect(posts.body.status).toBe(404);

      expect(posts.body).toHaveProperty("nomor_registrasi");
      expect(posts.body).toHaveProperty("nama_dokter");
      expect(posts.body).toHaveProperty("profesi");
      expect(posts.body).toHaveProperty("jenis_kelamin");
      expect(posts.body).toHaveProperty("email");
      expect(posts.body).toHaveProperty("nomor_telepon");
      expect(posts.body).toHaveProperty("alamat");
      expect(posts.body).toHaveProperty("jadwal_praktek");

      expect(posts.body.nomor_registrasi).toBe("A001");
      expect(posts.body.nama_dokter).toBe("dr. Gus Arya");
      expect(posts.body.profesi).toBe("Sp.Ak");
      expect(posts.body.jenis_kelamin).toBe("Laki-Laki");
      expect(posts.body.email).toBe("gusarya@gmail.com");
      expect(posts.body.nomor_telepon).toBe("081777278020");
      expect(posts.body.alamat).toBe("jl. kuta baru");
      expect(posts.body.jadwal_praktek).toBe(["selasa", "rabu", "sabtu"]);
      //expect(posts).toBeDefinded();
    });
  });

  describe("PUT /dokter/:id", () => {
    //do testing
    it("should return inserted post when data inserted", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A001",
          nama_dokter: "dr. Gus Arya",
          profesi: "Sp.Ak",
          jenis_kelamin: "Laki-Laki",
          email: "gusarya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kuta baru",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.body.status).toBe(200);
      expect(posts.body.nomor_registrasi).toBe("A001");
      expect(posts.body.nama_dokter).toBe("dr. Gus Arya");
      expect(posts.body.profesi).toBe("Sp.Ak");
      expect(posts.body.jenis_kelamin).toBe("Laki-Laki");
      expect(posts.body.email).toBe("gusarya@gmail.com");
      expect(posts.body.nomor_telepon).toBe("081777278020");
      expect(posts.body.alamat).toBe("jl. kuta baru");
      expect(posts.body.jadwal_praktek).toBe(["selasa", "rabu", "sabtu"]);
    });
    it("should return error nomor_registrasi validation when nomor_registrasi not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/")
        .send({
          // kurang id ambil dari database
          nama_dokter: "dr. Gus Arya",
          profesi: "Sp.Ak",
          jenis_kelamin: "Laki-Laki",
          email: "gusarya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kuta baru",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("nomor_registrasi harus diisi ");
    });
    it("should return error nama_dokteri validation when nama_dokter not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A001",
          profesi: "Sp.Ak",
          jenis_kelamin: "Laki-Laki",
          email: "gusarya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kuta baru",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("nama_dokter harus diisi ");
    });
    it("should return error profesi validation when profesi not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A001",
          nama_dokter: "dr. Gus Arya",
          jenis_kelamin: "Laki-Laki",
          email: "gusarya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kuta baru",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("profesi harus diisi ");
    });
    it("should return error jenis_kelamin validation when jenis_kelamin not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A001",
          nama_dokter: "dr. Gus Arya",
          profesi: "Sp.Ak",
          email: "gusarya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kuta baru",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("jenis_kelamin harus diisi ");
    });
    it("should return error email validation when email not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A001",
          nama_dokter: "dr. Gus Arya",
          profesi: "Sp.Ak",
          jenis_kelamin: "Laki-Laki",
          nomor_telepon: "081777278020",
          alamat: "jl. kuta baru",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("email harus diisi ");
    });
    it("should return error nomor_telepon validation when nomor_telepon not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A001",
          nama_dokter: "dr. Gus Arya",
          profesi: "Sp.Ak",
          jenis_kelamin: "Laki-Laki",
          email: "gusarya@gmail.com",
          alamat: "jl. kuta baru",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("nomor_telepon harus diisi ");
    });
    it("should return error alamat validation when alamat not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A001",
          nama_dokter: "dr. Gus Arya",
          profesi: "Sp.Ak",
          jenis_kelamin: "Laki-Laki",
          email: "gusarya@gmail.com",
          nomor_telepon: "081777278020",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("alamat harus diisi ");
    });

    it("should return error jadwal_praktek validation when jadwal_praktek not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A001",
          nama_dokter: "dr. Gus Arya",
          profesi: "Sp.Ak",
          jenis_kelamin: "Laki-Laki",
          email: "gusarya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kuta baru",
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("jadwal_praktek harus diisi ");
    });

    it("should return when all field are not field", async () => {
      const posts = await supertest(app).put("/dokter/").send({}); // kurang id ambil dari databas
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("Semua harus diisi ");
    });
  });

  describe("DELETE /dokter/:id", () => {
    //do testing
    it("should delete one data", async () => {
      const deletePost = await supertest(app).delete(
        "/dokter/648166131779657bfc6d5e8d"
      ); // kurang id ambil dari databas
      const posts = await supertest(app).get("/dokter");
      expect(deletePost.status).toBe(200);
      expect(posts.body.message).toHaveLength(3);
    });
  });

  afterAll(async () => {
    //dieksekusi setelah semua test berjalan
    await disconnect();
  });
});
