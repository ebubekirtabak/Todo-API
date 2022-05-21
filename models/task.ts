import { Model, Modifiers } from "objection";

class Task extends Model {
  id!: number;
  userId!: number;
  text!: string;
  isChecked!: boolean;

  static tableName = 'users'
  static jsonSchema = {
    type: 'object',
    required: ['userId', 'text', 'isChecked'],
    properties: {
      id: { type: 'integer' },
      userId: { type: 'integer' },
      text: { type: 'string', minLength: 1, maxLength: 400 },
      isChecked: { type: 'boolean' },
    },
  };

  static modifiers: Modifiers = { };

};

export default Task;

