module.exports = {
  type: 'postgres',
  //   host: 'localhost',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'pm_local',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
