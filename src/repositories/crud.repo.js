
const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils");

class CrudRepositories {

  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async destroy(id) {

    const response =
      await this.model.destroy({
        where: { id }
      });

    if (!response) {

      throw new AppError(
        "Requested item not found",
        StatusCodes.NOT_FOUND
      );

    }

    return response;
  }

  async get(id) {

    const response =
      await this.model.findByPk(id);

    if (!response) {

      throw new AppError(
        "Requested item not found",
        StatusCodes.NOT_FOUND
      );

    }

    return response;
  }

  async getAll(condition) {
    return await this.model.findAll(condition);
  }

  async update(id, data) {

    const item =
      await this.model.findByPk(id);

    if (!item) {

      throw new AppError(
        "Requested item not found",
        StatusCodes.NOT_FOUND
      );

    }

    await item.update(data);

    return item;
  }

}

module.exports = CrudRepositories;