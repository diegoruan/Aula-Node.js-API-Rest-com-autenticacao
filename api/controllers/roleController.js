const RoleService = require('../services/roleService')
const roleService = new RoleService

class RoleController {
    static async cadastrar(req, res) {
        const { nome, descricao } = req.body

        try {
            const role = await roleService.cadastrar({ nome, descricao })

            res.status(201).send(role)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscar(req, res) {
        const listaRoles = await roleService.buscaRoles()

        res.status(200).json(listaRoles)
    }

    static async buscarId(req, res) {
        try {
            const { id } = req.params
            const role = await roleService.buscaPorId(id)

            res.status(200).json(role)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarRole(req, res) {
        try {
            const { id } = req.params
            await roleService.deletaRole(id)

            res.status(200).send({ message: "Usuario deletado!" })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarRole(req, res) {
        const { id } = req.params
        const { nome, descricao } = req.body

        try {
            const role = await roleService.editaRole({id, nome, descricao})
            res.status(200).json(role)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = RoleController