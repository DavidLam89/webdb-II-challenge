const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: 'data/lambda.sqlite3',
    },
};

const db = knex(knexConfig);

router.post('/', (req, res) => {
    db('bears')
        .insert(req.body)
        .then(ids => {
            res.status(201).json(ids[0]);
        })
        .catch(error => {
            res.status(500).json({ error: "Some useful error message" });
        });
});

router.get('/', (req, res) => {
    db('bears')
        .then(bears => {
            res.status(200).json(bears);
        })
        .catch(error => {
            res.status(500).json(bears);
        });
});

router.get('/:id', (req, res) => {
    const bearId = req.params.id;
    db('bears')
        .where({ id: bearId })
        .first()
        .then(bear => {
            bear ? res.status(200).json(bear) : res.status(404).json({ message: 'ID not found' });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/:id', (req, res) => {
    db('bears')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'ID not found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.put('/:id', (req, res) => {
    db('bears')
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: 'ID not found' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

module.exports = router;