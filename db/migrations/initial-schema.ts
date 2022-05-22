exports.up = (knex: any) => {
  
  // Create the tasks table
  return knex.schema.createTable('users', (table: any) => {
    table.increments('id').primary();

    table.string('email');
    table.string('name');
    table.string('password');
    table.timestamp('created_date');
    table.unique(['email']);
  })
  .createTable('tasks', (table: any) => {
    table.increments('id').primary();

    table.integer('userId').references('users.id');
    table.string('text');
    table.timestamp('created_date');
    table.boolean('isChecked');
    table.unique(['id']);
  });
};
  
exports.down = (knex: any) => {
  
  // Drop the tasks table
  return knex.schema.dropTableIfExists('users')
    .dropTableIfExists('tasks');
};
