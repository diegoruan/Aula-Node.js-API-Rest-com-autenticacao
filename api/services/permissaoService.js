const { where } = require('sequelize')
const database = require('../models')
const uuid = require('uuid')

class PermissaoService {
    async cadastrar(dto) {
        const permissao = await database.permissoes.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (permissao) {
            throw new Error('Permissão já cadastrada')
        }
    
        try {
            const novaPermissao = await database.permissoes.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            })

            return novaPermissao
        } catch (error) {
            throw new Error('Erro ao cadastrar permissão')
        }
    }

    async buscarTodasPermissoes() {
        const listaPermissoes = await database.permissoes.findAll()

        return listaPermissoes
    }

    async buscarPermisaoPorId(id) {
        const permissao = await database.permissoes.findOne({
            where: {
                id: id
            }
        })

        if (!permissao) {
            throw new Error("Permissão não cadastrada!")
        }

        return permissao
    }

    async deletarPermissao(id) {
        await this.buscarPermisaoPorId(id)

        try {
            await database.permissoes.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error("Erro ao deletar permissão")
        }
    }

    async editarPermissao(dto) {
        const permissao = await this.buscarPermisaoPorId(dto.id)

        try {
            permissao.nome = dto.nome
            permissao.descricao = dto.descricao

            await permissao.save()
            return permissao
        } catch (error) {
            throw new Error("Erro ao editar permissão")
        } 
    }

}

module.exports = PermissaoService