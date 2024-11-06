const { Router } = require('express')
const UsuarioController = require('../controllers/usuarioController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router
    .post('/usuarios', UsuarioController.cadastrar) //Cria um novo usuario
    .get('/usuarios', autenticado, UsuarioController.buscarTodosUsuarios)  //Busca todos os usuarios
    .get('/usuarios/id/:id', autenticado, UsuarioController.buscarUsuarioPorId)  //Busca um usuario por ID
    .put('/usuarios/id/:id', autenticado, UsuarioController.editarUsuario)  //Modifica um usuario
    .delete('/usuarios/id/:id', autenticado, UsuarioController.deletarUsuario)  //Deleta um usuario

module.exports = router