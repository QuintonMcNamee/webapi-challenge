const express = require('express');

const actionDb = require('../data/helpers/actionModel.js');

const projectDb = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  actionDb.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  projectDb.get(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.post('/:id', validateLength, (req, res) => {
  const id = req.params.id;
  const something = req.body;

  actionDb.insert(something)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  actionDb.get(id)
    .then(response => {
      actionDb.remove(response.id)
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
});

router.put('/:id', validateLength, (req, res) => {
  const id = req.params.id;

  actionDb.get(id)
    .then(response => {
      req.body.project_id = response.project_id;
      actionDb.update(id, req.body)
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
});

// custom middleware

function validateLength(req, res, next) {
  const description = req.body.description;

  if(description.length <= 128) {
    next();
  }
  else {
    res.status(404).json({ message: "Error"});
  };
};

module.exports = router;
