const express = require('express');
const route = express();
const knex = require('knex');
const knexfile = require('./knexfile');

const dbConfig = knexfile.development
const db = knex(dbConfig)


route.get('/',(req, res) => {
    db('cars')
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => console.log(err))
})

route.post('/', (req, res) => {
    db('cars')
        .insert(req.body)
        .then(newCar => {
            res.status(200).json(newCar);
        })
        .catch(err => {
            res.status(591).json({errorMessage:"Error"});
        })
})
route.put('/:id', (req, res) => {
    const {id} = req.params;
    const toBeUpdate = req.body;

    db("cars")
        .where({id: id})
        .update(toBeUpdate)
        .then(count => {
            if (count > 0) {
                res.status(200).json(count);
            } else {
                res.status(400).json({message: "record not found by this id"})
            }
        })
        .catch(err => console.log(err));
});

route.delete('/:id', (req, res) => {
    db("cars")
        .where({id: req.params.id})
        .delete()
        .then(() => {
            res.status(200).json({message: "record deleted"});
        })
        .catch(err => res.status(400).json({message: "cannot delete with some reason"}));
})

module.exports = route