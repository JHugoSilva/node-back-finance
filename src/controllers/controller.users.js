import serviceUsers from "../services/service.users.js"

const login = async(req, res) => {
    
    try {
        
        const user = await serviceUsers.login(req)

        if (user) {
            res.status(200).json(user)
        } else {
            res.status(401).json(error)
        }
        
    } catch (error) {
        res.status(500).json({ 'error': error.message })
    }
    
}

const register = async(req, res) => {
     
    try {
        const user = await serviceUsers.register(req)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ 'error' : error.message })
    }
}

const profile = async(req, res) => {
    try {
        const user = await serviceUsers.profile(req)
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({ 'error': error.message })
    }
}

const edit = async(req, res) => {
    try {
        const user = await serviceUsers.edit(req)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ 'error': error.message })
    }
}

const password = async(req, res) => {
    try {
        const user = await serviceUsers.password(req)
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({'error': error.message })
    }
}


export default { login, register, profile, edit, password }