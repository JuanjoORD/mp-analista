'use strict'
//aqui tambien usamos rutas
const router = require('express').Router();
//le pedimos que llame al controlador 
var BranchController = require('../../controllers/BranchController');


router.get('/', BranchController.listAll);
router.get('/:branchId', BranchController.findOne);
router.post('/', BranchController.saveOne);
router.put('/:branchId', BranchController.updateOne);
router.delete('/:branchId', BranchController.deleteOne);



//porque esta ruta de genero ya tiene ese prefijo, lo indicamos en el api.js de la carpeta de rutas
//se exportan nuestros métodos del router.
module.exports = router;