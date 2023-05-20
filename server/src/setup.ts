import AppDataSource from "../config/ormconfig";

export const initializeDB = () =>{
    console.log("HI Guy")
    AppDataSource.initialize()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Error connecting to database:', error);
    AppDataSource.destroy();
  });
}


export const teardown = () => {
    AppDataSource.destroy();
}
