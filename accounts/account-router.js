const express = require('express');
const db = require("../data/dbConfig.js");
const router = express.Router();

const Accounts = {

    getAll() {
        return db('accounts')
    },

    getById(id) {
        return db('accounts').where({ id }).first()
    },

    addAccount(account) {
        return db('accounts').insert(account)
    },
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

router.post("/", (req, res) => {
    Accounts.addAccount(req.body) 
    .then(([id]) => {
        return Accounts.getById(id).first()
    })
    .then((newAccount) => {
        res.status(200).json(newAccount)
    })
    .catch(error => {
        res.json({error: error.message})
    })
})

module.exports = router;