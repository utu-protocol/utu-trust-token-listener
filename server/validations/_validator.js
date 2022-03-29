export default class Validator {
  schema = null;

  constructor(schema) {
    this.schema = schema;
  }

  validate(data) {
    const schema = this.schema;
    const { error } = schema.validate(data || {}, { abortEarly: false });
    if (!error) return null;

    const { details } = error;
    const errors = {};
    details.forEach((detail) => {
      errors[detail.context.label] = detail.message
        .replace("\"", "")
        .replace('"', "")
        .replaceAll('"', "'");
    });
    if (errors) {
      throw { status: 422, message: errors };
    }
  }
}
