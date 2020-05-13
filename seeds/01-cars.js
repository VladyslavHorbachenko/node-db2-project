
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { VIN: 1111, model: "9-5", make: 'saab', mileage: 0, title: "clean" }
      ]);
    });
};
