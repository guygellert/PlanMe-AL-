import AppDataSource from "../config/ormconfig";

export const initializeDB = () =>{
    AppDataSource.initialize()
  .then(() => {
    console.log('Connected to database');
    return true;
  })
  .catch((error) => {
    console.log('Error connecting to database:', error);
    AppDataSource.destroy();
    return false;
  });
}


export const teardown = () => {
    AppDataSource.destroy();
}
