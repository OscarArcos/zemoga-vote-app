const MongoLib = require('../lib/mongo');

class PeopleService {
  constructor() {
    this.collection = 'people';
    this.mongoDB = new MongoLib();
  }
  async getPeople() {
    const people = await Promise.resolve(this.mongoDB.getAll(this.collection));
    return people || [];
  }
  async getPerson({ personId }) {
    const person = await Promise.resolve(
      this.mongoDB.get(this.collection, personId)
    );
    return person || {};
  }
  async createPerson({ person }) {
    const createPersonId = await Promise.resolve(
      this.mongoDB.create(this.collection, person)
    );
    return createPersonId || {};
  }
  async updatePerson({ personId, person } = {}) {
    const updatedPerson = await Promise.resolve(
      this.mongoDB.update(this.collection, personId, person)
    );
    return updatedPerson || {};
  }
  async deletePerson({ personId }) {
    const deletePerson = await Promise.resolve(
      this.mongoDB.delete(this.collection, personId)
    );
    return deletePerson || {};
  }
}

module.exports = PeopleService;
