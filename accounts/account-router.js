const express = require('express');
const db = require("../data/dbConfig.js");
const router = express.Router();

const Accounts = {

    getAll() {
        return db('accounts')
    },

    getById(id) {
        return db('accounts').where({ id }).first()
    }
}

router.get('/', (req, res) => {
    Accounts.getAll()
    .then(allAccounts => {
        res.status(200).json(allAccounts)
    })
    .catch(error => {
        // res.json({ message: 'oops, something went wrong' }) // production
        res.json({ error: error.message }) // development
    })
})

router.get('/:id', (req, res) => {
    Accounts.getById(req.params.id)
    .then((account) => {
        if (account) {
            res.status(200).json(account)
        } else {
            res.status(404).json({message: 'id not found'})
        }
    })
    .catch(error => {
        // res.json({ message: 'oops, something went wrong' }) // production
        res.json({ error: error.message }) // development
    })
})

module.exports = router;