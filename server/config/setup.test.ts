import { User } from '../src/entities/User';
import {initializeDB,teardown} from '../src/setup';
import AppDataSource from './ormconfig';

beforeEach(() => {
  initializeDB();
  });
  
  afterEach(() => {
    teardown();
  });
  
  test('select from users table', async () => {
    const users = await AppDataSource.getRepository(User).find();
    expect(users).toBeTruthy;
  });
  