import serviceLancing from "../services/service.lancing.js"


const summary = async(req, res) => {
    try {
        
        const lancing = await serviceLancing.summary(req)
        res.status(200).json(lancing)
    } catch (error) {
        res.status(500).json({ error:error.message })
    }
}

const list = async(req, res) => {
    try {
        
        const lancing = await serviceLancing.list(req)
        res.status(200).json(lancing)
    } catch (error) {
        res.status(500).json({ error })
    }
}

const listId = async(req, res) => {
    try {
        
        const lancing = await serviceLancing.listId(req)
        res.status(200).json(lancing)
    } catch (error) {
        res.status(500).json({ error })
    }
}


const insert = async(req, res) => {
    try {
        const lancing = await serviceLancing.insert(req)
        res.status(201).json(lancing)
    } catch (error) {
        res.status(500).json({error: error.message })
    }
}

const edit = async(req, res) => {
    try {
        const lancing = await serviceLancing.edit(req)
        res.status(200).json(lancing)
    } catch (error) {
        res.status(500).json({ error })
    }
}

const exlude = async(req, res) => {
    try {
        const lancing = await serviceLancing.exlude(req)
        res.status(200).json(lancing)
    } catch (error) {
        res.status(500).json({ error:error.message })
    }
}


export default { summary, list, listId, insert, edit, exlude }