const multer = require('multer');

// == config multer
const storage = multer.diskStorage({
    //* on indique l'endroit ou on stock la photo
    destination: (requete, file, cb) => {
      cb(null, './public/images')
    },
    //* puis le nom du fichier
    filename: (requete, file, cb) => {
      const date = new Date().toLocaleDateString();
      cb(null, date+"-"+Math.round(Math.random()*1000)+"-"+file.originalname)
    }
  });

  const fileFilter = (requete, file, cb) => {
    //* ici on précise le type de fichier que l'on va indiquer
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true)
    } else {
      cb(new Error("L'image n'est pas acceptée"))
    }
  };

  const upload = multer({
    storage,
    //* pour gérer la limit max de la size de l'image
    limits: {
      fileSize: 1024*1024*5
    },
    fileFilter
  })