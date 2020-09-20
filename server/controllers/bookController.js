const mongoose = require('mongoose');
const livreModel = require('../models/livres');
const auteurModel = require('../models/author');
const authorModel = require('../models/author');
const fs = require('fs');

const bookController = {

    getAllBooks: (req, res) => {
        livreModel.find()
        // j'indique que je veux le dvt du champ "auteur"
        .populate("auteur")
        .exec()
        .then((livres) => {
            console.log(livres)
            res.send({
                livres,
                message: "liste des livres reçu avec succes"
            })
        })
        .catch(err => console.trace(err));
    },

    getOneBook: (req, res) => {
        console.log('demande de livre ayant l id', req.params.id);
        livreModel.findById(req.params.id)
        .populate("auteur")
        .exec()
        .then((livre) => {
            console.log('livre', livre);
            return res.status(200).send(livre);
        })
        .catch(err => {
            console.trace(err);
            res.status(500).send({
                err,
                message: "ce livre n existe pas"
            });
        })
    },
    addBook: (req, res) => {
        // je recup le body
        let dataBook = req.body;
        console.log('req.body ==================>', req.body)
        console.log('req.file', req.file)
        // console.log('dataBook', dataBook.formdata);
        // console.log('req.body.image', req.body.image)
        // on check si le livre existe
        livreModel.findOne({
            nom: req.body.nom
        }, (err, result) => {
            console.log('result', result);
            if (result) {
                res.status(500).send('le titre de ce livre existe deja');
            }
        });
        // console.log('checkLivre', checkLivre)
        const livre = new livreModel({
            // _id: new mongoose.Types.objectId(),
            _id: new mongoose.Types.ObjectId(),
            nom: req.body.nom,
            auteur: req.body.auteur,
            pages: req.body.pages,
            description: req.body.description,
            nbrePage: req.body.nbrePage,
            image : req.file.path.substring(14)
            // image: req.body.image
        });
        livre.save()
        .then(resultat => {
            console.log('resultat', resultat);
            res.status(200).send(resultat);
        })
        .catch(err => {
            console.trace(err);
            res.status(500).send('impossible d ajouter le livre')
        })
    },
    updateBook: (req, res) => {
        let bookId = req.params.id;
        console.log('bookId', bookId);
        console.log('req.body', req.body);
        req.body.image = req.file.path.substring(14);
        // faire la verif si l'auteur existe
        // const allAuthors = authorModel.find({})
        livreModel.updateOne({_id: bookId}, req.body)
        .exec()
        .then(result => {
            console.log('result', result);
            if (result.nModified < 1) {
                console.log('aucune modification apporté');
            }
            result.message = "livre modifié avec succés"
            console.log('livre modifié avec succés')
            res.send(result);
        })
        .catch(err => console.trace(err))
    },
    deleteBook: (req, res) => {
        let bookId = req.params.id;
        console.log('bookId', bookId);
        //*  == on recupère le livre
        //* == on souhaite le champ image
        const book = livreModel.findById(bookId)
            .select("image")
            .exec()
            .then((book) => {
                fs.unlink(`./public/images/${book.image}`, error => {
                    console.log('error in fs unlink', error)
                })
            })

        livreModel.remove({_id: bookId})
        .exec()
        .then(result => {
            console.log('je suis dans le .then')
            if (result.deletedCount < 1) {
                res.send('requete echouée');
                throw new Error("requete du suppression échouée")
            }
            console.log('result', result);
            console.log('livre supprimé avec succes');
            result.message = 'livre supprimé avec succes';
            res.send(result);
        })
        .catch(error => {
            console.log('error in catch delete', error);
            // error.message = 'l\'id n\'est pas correct';
            let message = 'l\'id n\'est pas correct';
            res.status(500).send(message);
        })

    }
}

module.exports = bookController;

