const PermissaoService = require('../services/permissaoService')

const permissaoService = new PermissaoService()

class PermissaoController {
    static async cadastrar(req, res) {
        const { nome, descricao } = req.body

        try {
            const permissao = await permissaoService.cadastrar({ nome, descricao })

            res.status(201).send(permissao)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodasPermissoes(req, res) {
        const listaPermissoes = await permissaoService.buscarTodasPermissoes()

        res.status(200).json(listaPermissoes)
    }

    static async buscarPermisaoPorId(req, res) {
        try {
            const { id } = req.params
            const permissao = await permissaoService.buscarPermisaoPorId(id)

            res.status(200).json(permissao)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarPermissao(req, res) {
        try {
            const { id } = req.params
            await permissaoService.deletarPermissao(id)

            res.status(200).send({ message: "Permissão deletada!" })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarPermissao(req, res) {
        try {
            const { id } = req.params
            const { nome, descricao } = req.body
            const permissao = await permissaoService.editarPermissao({ id, nome, descricao })

            res.status(200).json(permissao)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = PermissaoController