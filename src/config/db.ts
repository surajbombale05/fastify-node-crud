import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('auth', 'root', 'suraj@59', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;
