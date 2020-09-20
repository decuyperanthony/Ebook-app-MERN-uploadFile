const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: String,
    prenom: String,
    age: Number,
    sexe: Boolean
    // nbrePage: Number,
});

// on ajoute un virtual pour associer les auteurs aux livres
// pour avoir la liste des auteurs et les livres de chacun
// nous nommons comme nous voulons "livres" line 15
authorSchema.virtual("livres", {
    // la ref de la collection
    ref: "Livre",
    // le localfield => champ présent dans la collecion
    // permettant de faire le lien
    localField: "_id",
    // le champ souhaité
    // foreign field qui sera dans notre liste le champ auteur
    // donc on ajoutera le champ auteur au livre
    foreignField: "auteur"
})

const authorModel = mongoose.model("Auteur", authorSchema);

module.exports = authorModel;
