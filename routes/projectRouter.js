const express = require('express');

const projectDb = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  projectDb.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/:id', validateId, (req, res) => {
  const id = req.params.id;

  projectDb.get(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.post('/', (req, res) => {
  const something = req.body;

  projectDb.insert(something)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.delete('/:id', validateId, (req, res) => {
  const id = req.params.id;

  projectDb.remove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.put('/:id', validateId, (req, res) => {
  const id = req.params.id;

  projectDb.update(id, req.body)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

// custom middleware

function validateId(req, res, next) {
  const id = req.params.id;

  projectDb.get(id)
    .then(response => {
      if(!response) {
        res.status(404).json({ message: "Error" });
      };
      if(response) {
        next();
      };
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = router;
