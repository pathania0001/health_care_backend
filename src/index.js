const app = require('./app');

const { sequelize } =
require('./models');

require('dotenv').config();

const PORT =
process.env.PORT || 5000;

const startServer = async () => {

  try {

    await sequelize.authenticate();

    console.log(
      'PostgreSQL connected successfully.'
    );

    app.listen(PORT, () => {

      console.log(
        `Server running on http://localhost:${PORT}`
      );

    });

  } catch (error) {

    console.error(
      'Failed to start server:',
      error
    );

    process.exit(1);

  }

};

startServer();