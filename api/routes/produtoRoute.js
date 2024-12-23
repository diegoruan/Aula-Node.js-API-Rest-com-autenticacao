const { Router } = require('express')
const ProdutoController = require('../controllers/produtoController')
const autenticado = require('../middleware/autenticado')
// const roles = require('../middleware/roles')
// const permissoes = require('../middleware/permissoes')
const permissoesRoles = require('../middleware/permissoesRoles')


const router = Router()

router.use(autenticado)

router
  .post('/produto',permissoesRoles(["adicionar"]), ProdutoController.cadastrarProduto)
  .get('/produto', permissoesRoles(["listar"]), ProdutoController.buscarTodosProdutos)
  .get('/produto/id/:id',permissoesRoles(["listar"]), ProdutoController.buscarProdutoPorId)
  .delete('/produto/id/:id', permissoesRoles(["remover"]), ProdutoController.deletarProdutoPorId)
  .put('/produto/id/:id', permissoesRoles(["editar"]), ProdutoController.editarProduto)

module.exports = router