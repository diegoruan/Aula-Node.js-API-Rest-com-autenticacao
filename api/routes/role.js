const { Router } = require('express')
const RoleController = require('../controllers/roleController')

const router = Router()

router
    .post('/roles', RoleController.cadastrar)
    .get('/role', RoleController.buscar)
    .get('/role/id/:id',RoleController.buscarId)
    .delete('/role/id/:id', RoleController.deletarRole)
    .put('/role/id/:id', RoleController.editarRole)

module.exports = router