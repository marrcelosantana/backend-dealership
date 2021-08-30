
exports.up = function(knex) {
  return knex.schema.createTable('cars', function(table){
    table.increments(); //Cria uma chave primária que se auto incrementa.

    table.string('car_name').notNullable();
    table.string('brand').notNullable(); //marca
    table.string('model').notNullable();
    table.decimal('age', 4).notNullable();
    table.string('client_id').notNullable();

    table.foreign('client_id').references('id').inTable('clients');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('cars');
};
