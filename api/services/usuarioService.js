const database = require('../models')
const { hash } = require('bcryptjs')
const uuid = require('uuid')

class UsuarioService {
    async cadastrar(dto) {
        //Verifica se usuario já esta cadastrado com base no email
        const usuario = await database.usuarios.findOne({
            where: {
                email: dto.email
            }
        })

        if (usuario) {
            throw new Error('Usuario já cadastrado')
        }

        try {
            //Criptografa senha do usuario
            const senhaHash = await hash(dto.senha, 8)
    
            //Objeto de cadastro
            const novoUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            }) 
            
            return novoUsuario
        } catch (error) {
            throw new Error('Erro ao cadastrar usuario')
        }
    }

    async buscarTodosUsuarios() {
        const listaUsuarios = await database.usuarios.findAll();
        return listaUsuarios
    }

    async buscarUsuarioPorId(id) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: id
            }
        })

        if (!usuario) {
            throw new Error('Usuario informado não cadastrado!')
        }

        return usuario
    }

    async editarUsuario(dto) {
        const usuario = await this.buscarUsuarioPorId(dto.id)
        try {
            usuario.nome = dto.nome
            usuario.email = dto.email

            await usuario.save()
            return usuario
        } catch (error) {
            throw new Error('Erro ao editar usuario!')
        }
    }

    async deletarUsuario(id) {
        const usuario = await this.buscarUsuarioPorId(id)

        try {
            await database.usuarios.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar deletar o usuario!')
        }
    }

}

module.exports = UsuarioService