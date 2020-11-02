const express = require('express');
const db = require("../data/dbConfig.js");
const router = express.Router();

const Accounts = {

    getAll() {
        return db('accounts')
    },

    getById(id) {

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


module.exports = router;