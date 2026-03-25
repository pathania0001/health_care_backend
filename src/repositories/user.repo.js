const { User } =
require("../models");

class UserRepository {

  constructor() {

    this.model = User;

  }

  async create(data) {

    return await this.model.create(data);

  }

  async getUserByEmail(email) {

    return await this.model.findOne({
      where: { email }
    });

  }

  async getById(id) {

    return await this.model.findByPk(id);

  }

  async updateRefreshToken(
    userId,
    refreshToken
  ) {

    return await this.model.update(
      { refreshToken },
      { where: { id: userId } }
    );

  }

}

module.exports =
UserRepository;