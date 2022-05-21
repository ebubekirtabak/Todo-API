import { Model, Modifiers } from "objection";

class User extends Model {
  id!: number
  email!: string
  password!: string

  static tableName = 'users'
  static jsonSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      id: { type: 'integer' },
      email: { type: 'string', minLength: 1, maxLength: 255 },
      password: { type: 'string', minLength: 6, maxLength: 255 },
    },
  };

  static modifiers: Modifiers = {

  };

  static get relationMappings() {
    const Task = require('./task');

    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'user.id',
          to: 'task.userId'
        }
      },
    };
  }

}

export default User;

