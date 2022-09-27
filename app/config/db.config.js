module.exports = {
    HOST: process.env.DBHOST,
    USER: 'root',
    PASSWORD: process.env.DBPASS,
    DB: 'gestion',
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };