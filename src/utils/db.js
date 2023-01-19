import { Sequelize } from 'sequelize';


const initDb = async () => {
  const sequelize = new Sequelize('postgres', 'postgres', '1257', {
    host: 'localhost',
    dialect: 'postgres',
    omitNull: true,
  }); 

  try {
    await sequelize.authenticate();

    console.log('success');

    return sequelize;
  } catch (error) {
    console.log('Error -', error)
  }
}

const sequelize = await initDb();

export default sequelize;