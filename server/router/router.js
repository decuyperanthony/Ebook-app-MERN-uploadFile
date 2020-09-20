const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('page d accueil demande');
    res.end('page d accueil demande');
});

router.use((req, res, next) => {
    const error = new Error("Page non trouvée");
    error.status = 404;
    next(error);
})

router.use((error, req, res) => {
    res.status(error.status || 500);
    res.end(error.message);
})

module.exports = router;