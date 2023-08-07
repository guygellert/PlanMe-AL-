import { initializeDB } from "../setup";

test('connecting to DB', () => {
    expect(initializeDB()).toBeTruthy();
  });

