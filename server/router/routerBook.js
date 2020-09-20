const express = require('express');
const router = express.Router();


const multer = require('multer');

// == config multer
const storage = multer.diskStorage({
    //* on indique l'endroit ou on stock la photo
    destination : (requete, file, cb)=> {
        console.log('cb', cb)
        cb(null, "./public/images/")
    },
    //* puis le nom du fichier
    filename : (requete, file, cb)=> {
        var date = new Date().toLocaleDateString();
        cb(null, date+"-"+Math.round(Math.random() * 10000)+"-"+file.originalname)
    }
  });

  const fileFilter = (requete, file, cb) =>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null, true)
    } else {
        cb(new Error("l'image n'est pas acceptée"),false)
    }
}

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter
})

// controller
const bookController = require('../controllers/bookController');

// == route Livre
router.get('/livres', bookController.getAllBooks);
router.get('/livre/:id', bookController.getOneBook);
router.post('/livre', upload.single("image"), bookController.addBook);
router.patch('/livre/:id', upload.single("image"), bookController.updateBook);
router.delete('/livre/:id', bookController.deleteBook);

module.exports = router;