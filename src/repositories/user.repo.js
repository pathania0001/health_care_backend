const CrudRepositories = require("./crud.repo");
const { User } = require("../models");

class UserRepository extends CrudRepositories {

  constructor() {
    super(User);
  }

  async getUserByEmail(email) {

    const response =
      await User.findOne({
        where: { email }
      });

    return response;

  }

}

module.exports = UserRepository;