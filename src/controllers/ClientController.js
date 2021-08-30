const connection = require('../database/connection');
const crypto = require('crypto'); //Usei o crypto para criar um ID aleatório.


module.exports = {
  async list(request, response){
    const clients = await connection('clients').select('*');
    return response.json(clients);
  }, 

  async create(request, response){
    const { name, age, city, uf } = request.body;
    const id = crypto.randomBytes(2).toString('HEX');
    await connection('clients').insert({ id, name, age, city, uf });
    return response.json({ id });
  },

  async delete(request, response){
    const { id } = request.params;
    await connection('clients').where('id', id).delete();
    return response.status(204).send();
  }
}