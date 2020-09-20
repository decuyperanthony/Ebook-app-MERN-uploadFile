const mongoose = require('mongoose');
const auteurModel = require('../models/author');

const authorController = {
    getAllAuthors: (req, res) => {
        auteurModel.find()
        //on fait un populate sur notre virtual
        .populate("livres")
        .exec()
        .then((authors) => {
            console.log(authors)
            res.send(authors)
        })
        .catch(err => console.trace(err));
    },
    getOneAuthor: (req, res) => {
        console.log('demande d auteur ayant l id', req.params.id);
        auteurModel.findById(req.params.id).exec()
        .populate("livres")
        .then((author) => {
            console.log('author', author);
            return res.status(200).send(author);
        })
        .catch(err => {
            console.trace(err);
            res.status(500).send('cet auteur n existe pas');
        })
    },
    addAuthor: (req, res) => {
        // je recup le body
        let dataAuthor = req.body;
        console.log('dataBook', dataAuthor);
        // on check si le livre existe
        //* test pour check si l'auteur existe deja
        // auteurModel.findOne({
        //     nom: req.body.nom
        // }, (err, result) => {
        //     console.log('result', result);
        //     if (result) {
        //         res.status(500).send('le titre de ce livre existe deja');
        //     }
        // });
        //* fin test
        const author = new auteurModel({
            // _id: new mongoose.Types.objectId(),
            _id: new mongoose.Types.ObjectId(),
            nom: req.body.nom,
            prenom: req.body.prenom,
            sexe: req.body.sexe,
            age: req.body.age
        });
        author.save()
        .then(resultat => {
            console.log('resultat', resultat);
            res.status(200).send(resultat);
        })
        .catch(err => {
            console.trace(err);
            res.status(500).send('impossible d ajouter l auteur')
        })
    },
}

module.exports = authorController;