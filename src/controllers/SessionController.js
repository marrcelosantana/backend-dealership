const connection = require('../database/connection');

module.exports = {
  async create(request, response){
    const { id } = request.body;
    const client = await connection('clients').where('id', id).select('name').first();
    if(!client){
      return response.status(400).json({ error: "Não existe um cliente com esse ID" });
    }
    return response.json(client);
  }
}