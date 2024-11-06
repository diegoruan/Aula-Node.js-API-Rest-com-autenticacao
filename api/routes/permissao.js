const { Router } = require('express')
const PermissaoController = require('../controllers/permissaoController')

const router = Router()

router
    .post('/permissao', PermissaoController.cadastrar)
    .get('/permissao', PermissaoController.buscarTodasPermissoes)
    .get('/permissao/id/:id', PermissaoController.buscarPermisaoPorId)
    .delete('/permissao/id/:id', PermissaoController.deletarPermissao)
    .put('/permissao/id/:id', PermissaoController.editarPermissao)

module.exports = router