const db = require("../db");

class UserController {
  async createReader(req, res) {
    const { name, surname } = req.body;
    const newPerson = await db.query(
      `INSERT INTO reader (login, name, surname, country) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, name, surname, "Ukraine"]
    );
    res.json(newPerson);
  }
  async getAllReaders(req, res) {
    const users = await db.query(`SELECT * FROM reader`);
    res.json(users.rows);
  }
  async getOneReader(req, res) {
    const id = req.params.id;
    const user = await db.query(`SELECT * FROM reader WHERE id = $1`, [id]);
    res.json(user.rows[0]);
  }
  async updateReader(req, res) {
    const { id, login, name, surname, country } = req.body;
    const user = await db.query(
      `UPDATE reader SET login = $2, name = $3, surname = $4, country = $5 WHERE id = $1 RETURNING *`,
      [id, login, name, surname, country]
    );
    res.json(user.rows);
  }
  async deleteUser(req, res) {}
}

module.exports = new UserController();
