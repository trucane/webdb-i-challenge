const express = require('express');
const knex = require('knex');

const db = require('./data/dbConfig.js');

// const dbConnection = knex({
//     client:'sqlite3',
//     connection:{
//         filename:'./data/budget.db3'
//     },
//     useNullAsDefault:true,
// })

const server = express();

server.use(express.json());

server.get('/budget', (req , res) =>{
    db('accounts')
    .then(budget =>{
        res.status(200).json(budget)
    })
    .catch(error =>{
        res.status(500).json(error)
    })
})

server.post('/budget', (req , res) =>{
    const post = req.body;
    db('accounts').insert(post, 'id')
    .then(ids =>{
        const lastInsert = ids[0];
        res.status(201).json(lastInsert)
    })
    .catch(error =>{
        res.status(500).json(error)
    })
})

server.put('/budget/:id', (req , res) =>{
    const {name, budget} = req.body;
    const {id} = req.params;

    const post = {
        "name":name,
        "budget":parseInt(budget)
    }

    db('accounts')
    .where({id:id})
    .update(post)
    .then(count =>{
        res.status(200).json(count)
    })
    .catch(error =>{
        res.status(500).json(error)
    })
})

server.delete('/budget/:id', (req , res) =>{
    const {id} = req.params;
    
    db('accounts').where({id: id}).del()
    .then(count =>{
        res.status(200).json({message: "record deleeted"})
    })
    .catch(error =>{
        res.status(500).json(error)
    })
})

module.exports = server;