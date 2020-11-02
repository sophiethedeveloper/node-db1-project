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

    update(id, account) {
        return db('accounts').where({ id }).update(account)
    }, 

    delete(id) {
        return db('accounts').where({id}).del()
    }
}

router.get('/', (req, res) => {
    Accounts.getAll()
    .then(allAccounts => {
        res.status(200).json(allAccounts)
    })
    .catch(error => {
        // res.json({ message: 'oops, something went wrong' }) // production
        res.status(500).res.json({ error: error.message }) // development
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
        res.status(500).res.json({ error: error.message }) // development
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
        res.status(500).res.json({error: error.message})
    })
})

router.put("/:id", (req, res) => {
    Accounts.update(req.params.id, req.body)
    .then((updated) => {
        if(!updated) {
            res.status(404).json({message: 'No account with this id'})
        } else {
            return Accounts.getById(req.params.id).first()
        }
    })
    .then((updatedAccount) => {
        res.status(200).json(updatedAccount)
    })
    .catch(error => {
        res.status(500).json({error: error.message})
    })
})

router.delete("/:id", (req, res) => {
    Accounts.delete(req.params.id) 
    .then(() => {
        res.status(200).json({message: 'account has been deleted'})
    })
    .catch(error => {
        res.status(500).json({message: error.message})
    })
})

module.exports = router;