import serviceCategory from "../services/service.category.js"

const list = async (req, res) => {
    try {
        const categorias = await serviceCategory.list(req)
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json({ 'error': error.message })
    }
}

const listId = async (req, res) => {
    try {
        const categorias = await serviceCategory.listId(req)
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json({ 'error': error.message })
    }
}

const listIcons = async (req, res) => {
    try {
        const icones = await serviceCategory.listIcons()
        res.status(200).json(icones)
    } catch (error) {
        res.status(500).json({ 'error': error.message })
    }
}


const insert = async(req, res) => {
    try {
        const categoria = await serviceCategory.insert(req)
        res.status(201).json(categoria)
    } catch (error) {
        res.status(500).json({ 'error': error.message })
    }
}

const edit = async(req, res) => {
    try {
        const categoria = await serviceCategory.edit(req)
        res.status(200).json(categoria)
    } catch (error) {
        res.status(500).json({ 'error': error.message })
    }
}

const exlude = async(req,res) => {
    try {
        const categoria = await serviceCategory.exlude(req)
        
        res.status(200).json(categoria)
    } catch (error) {
        
        res.status(500).json({ 'error': error.message })
    }
}


export default { list, listIcons, listId, insert, edit, exlude }