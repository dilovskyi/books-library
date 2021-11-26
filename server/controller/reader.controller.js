const db = require("../dbConfig");

class UserController {
  async createReader(req, res) {
    const { gender, username, email, password, confirmPassword } = req.body;
    const newPerson = await db.query(
      `INSERT INTO readers (gender, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      [gender, username, email, password]
    );
    res.json(newPerson.rows[0]);
  }
  async getAllReaders(req, res) {
    const users = await db.query(`SELECT * FROM readers`);
    res.json(users.rows);
  }
  async getOneReader(req, res) {
    const id = req.params.id;
    const user = await db.query(`SELECT * FROM readers WHERE id = $1`, [id]);
    res.json(user.rows[0]);
  }
  async updateReader(req, res) {
    const { id, login, name, surname, country } = req.body;
    const user = await db.query(
      `UPDATE readers SET login = $2, name = $3, surname = $4, country = $5 WHERE id = $1 RETURNING *`,
      [id, login, name, surname, country]
    );
    res.json(user.rows);
  }
  async deleteUser(req, res) {}
}

module.exports = new UserController();
