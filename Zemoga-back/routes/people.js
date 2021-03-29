const express = require('express');
const PeopleService = require('../services/people');

function poepleApi(app) {
  const router = express.Router();
  app.use('/api/people', router);

  const peopleServie = new PeopleService();

  // Route to get all People data
  router.get('/', async function (req, res, next) {
    try {
      const people = await peopleServie.getPeople();
      res.status(200).json({
        data: people,
        message: 'People listed',
      });
    } catch (error) {
      next(error);
    }
  });

  // Route to get an specific person data
  router.get('/:personId', async function (req, res, next) {
    const { personId } = req.params;
    try {
      const person = await peopleServie.getPerson({ personId });
      res.status(200).json({
        data: person,
        message: 'Person listed',
      });
    } catch (error) {
      next(error);
    }
  });

  // Route to create person by ID
  router.post('/', async function (req, res, next) {
    const { body: person } = req;
    try {
      const createPersonId = await peopleServie.createPerson({ person });
      res.status(201).json({
        data: createPersonId,
        message: 'Person Created',
      });
    } catch (error) {
      next(error);
    }
  });

  // Route to update person data
  router.put('/:personId', async function (req, res, next) {
    const { personId } = req.params;
    const { body: person } = req;
    try {
      const updatedPersonId = await peopleServie.updatePerson({ personId, person });
      res.status(200).json({
        data: updatedPersonId,
        person: person,
        message: 'Movie updated',
      });
    } catch (error) {
      next(error);
    }
  });

  // Route to delete person
  router.delete('/:personId', async function (req, res, next) {
    const { personId } = req.params;
    try {
      const updatedPersonId = await peopleServie.deletePerson({ personId });
      res.status(200).json({
        data: updatedPersonId,
        message: 'Movie updated',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = poepleApi;
