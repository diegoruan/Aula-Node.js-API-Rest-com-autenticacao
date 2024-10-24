const { Router } = require('express')
const UsuarioController = require('../controllers/usuarioController')

const router = Router()

router
    .post('/usuarios', UsuarioController.cadastrar) //Cria um novo usuario
    .get('/usuarios', UsuarioController.buscarTodosUsuarios)  //Busca todos os usuarios
    .get('/usuarios/id/:id', UsuarioController.buscarUsuarioPorId)  //Busca um usuario por ID
    .put('/usuarios/id/:id', UsuarioController.editarUsuario)  //Modifica um usuario
    .delete('/usuarios/id/:id', UsuarioController.deletarUsuario)  //Deleta um usuario

module.exports = router