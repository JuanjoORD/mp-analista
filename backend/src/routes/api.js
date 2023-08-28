const router = require('express').Router();

const apiBranchRouter = require('./api/BranchRouter');
//si una ruta viene con /usuario el encargado de la ruta será apiUsuarioRouter, y se concatena a router
router.use('/branch', apiBranchRouter);


module.exports = router;