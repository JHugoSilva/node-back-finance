import repositoryLancing from "../repositories/repository.lancing.js"

const summary = async(req) => {
    const id_usuario = req.id_user
    const lancing = await repositoryLancing.summary(id_usuario)
    return lancing
}

const list = async(req) => {
    const id_usuario = req.id_user
    const dt_filtro = req.query.dt_filtro
    const busca = req.query.busca
    const lancing = await repositoryLancing.list(id_usuario, dt_filtro, busca, 0)
    return lancing
}

const listId = async(req) => {
    const id_usuario = req.id_user
    const id_lancamento = req.params.id_lancing
    const lancing = await repositoryLancing.list(id_usuario,"","", id_lancamento)
    return lancing[0]
}

const insert = async(req) => {
    const id_usuario = req.id_user
    const { descricao, valor, id_categoria, tipo, dt_lancamento } = req.body
    const lancing = await repositoryLancing.insert(id_usuario, descricao, valor, id_categoria, tipo, dt_lancamento)
    return lancing[0]
}

const edit = async(req) => {
    const id_usuario = req.id_user
    const id_lancamento = req.params.id_lancing

    const { descricao, valor, id_categoria, tipo, dt_lancamento } = req.body
    const lancing = await repositoryLancing.edit(descricao, valor, id_categoria, tipo, dt_lancamento , id_lancamento, id_usuario)
    return lancing
}

const exlude = async(req) => {
    const id_usuario = req.id_user
    const id_lancamento = req.params.id_lancing
    const lancing = await repositoryLancing.exlude(id_lancamento, id_usuario)
    return lancing
}

export default { summary, insert, list, listId, edit, exlude }