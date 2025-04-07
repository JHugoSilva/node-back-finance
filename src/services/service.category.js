import repositoryCategory from '../repositories/repository.category.js'
import repositoryLancing from '../repositories/repository.lancing.js'

const list = async (req) => {
    const id_usuario = req.id_user
    const categorias = await repositoryCategory.list(id_usuario)
    return categorias
}

const listId = async (req) => {
    const id_usuario = req.id_user
    const id_categoria = req.params.id_category
    const categorias = await repositoryCategory.list(id_usuario, id_categoria)
    return categorias[0]
}

const listIcons = async (req) => {
    const categorias = await repositoryCategory.listIcons()
    return categorias
}


const insert = async(req) => {
    const id_usuario = req.id_user
    const { categoria, icone } = req.body
    const retorno = await repositoryCategory.insert(id_usuario, categoria, icone)
    return retorno[0]
}

const edit = async(req) => {
    const id_usuario = req.id_user
    const id_categoria = req.params.id_category
    const { categoria, icone } = req.body
    
    const retorno = await repositoryCategory.edit(id_categoria ,id_usuario, categoria, icone)
    
    return retorno[0]
}

const exlude = async(req) => {
    const id_usuario = req.id_user
    const id_categoria = req.params.id_category
    const lancamentos = await repositoryLancing.listByCategoy(id_usuario, id_categoria)
    
    if (lancamentos.length > 0) {
       throw new Error("Categorias que possuem lançamento não podem ser excluídas.")
    }
    const categoria = await repositoryCategory.exlude(id_categoria ,id_usuario)
    return categoria
}



export default { list, listIcons, listId, insert, edit, exlude }