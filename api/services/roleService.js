const { where } = require('sequelize')
const database = require('../models')
const uuid = require('uuid')

class RoleService {
    async cadastrar(dto) {
        const role = await database.roles.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (role) {
            throw new Error('Role já cadastrada')
        }

        try {
            const newRole = await database.roles.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            })

            return newRole
        } catch (error) {
            throw new Error('Erro ao cadastrar role')
        }
    }

    async buscaRoles() {
        const listaRoles = await database.roles.findAll()

        return listaRoles
    }

    async buscaPorId(id) {
        const role = await database.roles.findOne({
            where: {
                id: id
            }
        })

        if (!role) {
            throw new Error('Role informado não cadastrado!')
        }

        return role
    }

    async deletaRole(id) {
        await this.buscaPorId(id)

        try {
            await database.roles.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar deletar role!')
        }
    }

    async editaRole(dto) {
        const role = await this.buscaPorId(dto.id)

        try {
            role.nome = dto.nome
            role.descricao = dto.descricao

            await role.save()
            return role
        } catch (error) {
            throw new Error('Erro ao editar role!')
        }
    }
}

module.exports = RoleService