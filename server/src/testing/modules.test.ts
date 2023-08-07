import { getAllDish, getDishesByType } from "../bl/dish-bl";
import { getAllCuisine } from "../bl/cuisine-bl";
import { initializeDB, teardown } from "../setup";
import nlp from "compromise";
import { getAllMeals, getMealById, getTopMeals } from "../bl/meal-bl";

beforeEach(() => {
    console.log(process.env.TEST)
    initializeDB();
  });
  
  afterEach(() => {
    teardown();
  });


  test('Getting all cuisines', () => {
    getAllCuisine().then(data => expect(data.length).toBeGreaterThan(0));
  })


  test('Getting all dishes', () => {
    getAllDish().then(data => expect(data.length).toBeGreaterThan(0));
  })

  test('Getting dish by type side', () => {
    getDishesByType(false).then(data => expect(data[0].isMain).toBeFalsy());
  })

  test('Getting dish by type main', () => {
    getDishesByType(true).then(data => expect(data[0].isMain).toBeTruthy());
  })


  test('Getting all the meals', () => {
    getAllMeals().then(data => expect(data.length).toBeTruthy());
  })

  test('Get 3 top meals', () => {
    getTopMeals(1).then(data => expect(data).toHaveLength(3));
  })

  test('Get meal by id 1', () => {
    getMealById(1).then(data => expect(data).toHaveProperty('mainDish'))
  })

  test('nlp description without nouns', () => {
    let doc = nlp('i want something with a salad');
    let input = doc.nouns().toSingular().out('text');
    let inputPronuns = doc.pronouns().out('text');

    console.log(inputPronuns)

    expect(inputPronuns).toBe('salad')
  })