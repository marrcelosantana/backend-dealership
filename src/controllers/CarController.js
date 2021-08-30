const connection = require('../database/connection');

module.exports = {
  async list(request, response){
    const cars = await connection('cars').join('clients', 'clients.id', '=', 'cars.client_id').select(['cars.*', 'clients.name']);
    return response.json(cars);
  },
  
  async create(request, response){
    const { car_name, brand, model, age } = request.body;
    const client_id = request.headers.authorization;

    const [id] = await connection('cars').insert({ car_name, brand, model, age, client_id });

    return response.json({ id });
  },

  async delete(request, response){
    const { id } = request.params;
    const client_id = request.headers.authorization;

    const car = await connection('cars').where('id', id).select('client_id').first();

    if(car.client_id !== client_id){
      return response.status(401).json({ error: "Não autorizado!!" });
    }

    await connection('cars').where('id', id).delete();

    return response.status(204).send();
  }
}