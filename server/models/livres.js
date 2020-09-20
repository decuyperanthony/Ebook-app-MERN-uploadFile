const mongoose = require('mongoose');

const livreSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: String,
    auteur: {
        // on indique le type qui sera un object id de mongoose
        type: mongoose.Schema.Types.ObjectId,
        // on indique la ref qui est celle de la collection
        // concerné => "Auteur"
        ref: "Auteur",
        // enfin, on indique la propriete require
        // pour indiquer que tout livre doit avoir un auteur
        require: true

    },
    description: String,
    nbrePage: Number,
    image: String
})

// collection "Livre" (dans ma bdd c est "livres") association schema bdd
const livreModel = mongoose.model("Livre", livreSchema);

module.exports = livreModel;
