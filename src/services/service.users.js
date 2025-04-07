import bcrypt from 'bcrypt'
import jwt from '../token.js'
import repositoryUser from '../repositories/repository.user.js'

const login = async (req) => {
    
    const { email, senha } = req.body

    const user = await repositoryUser.getByUser(email)
    if (user.length == 0) {
        
        throw new Error('Email e/ou senha não localizados.')
    } else {
        if (await bcrypt.compare(senha, user[0].senha)) {
            
            delete user[0].senha
            
            user[0].token = jwt.createJWT(user[0].id_usuario)

            return user[0]
        } else {
            throw new Error('Email e/ou senha não localizados.')
        }
    }
}

const register = async (req) => {
    const { nome, email, senha } = req.body
  
    const hashPassword = await bcrypt.hash(senha , 10)

    const emailExists = await repositoryUser.getByUser(email)

    if (emailExists.length > 0) {
        req.headers['authorization'] = ""
        throw new Error('Email já cadastrado.')
    }

    const user = await repositoryUser.register(nome, email, hashPassword)
    user[0].token = jwt.createJWT(user[0].id_usuario)

    return user[0]
}

const profile = async(req) => {
  
    const id_user = req.id_user
    const user = await repositoryUser.getById(id_user)
    if (user.length == 0 || user == undefined) {
        req.headers['authorization'] = ""
        throw new Error('Usuário não localizado.')
    }
    delete user[0].senha
    return user[0]
}

const edit = async(req) => {

    const id_user = req.id_user
    const { nome, email } = req.body

    if (!nome) {
        throw new Error("O campo nome e obrigatorio")
    }
    if (!email) {
        throw new Error("O campo email e obrigatorio")
    }

    const userExists = await repositoryUser.getById(id_user)
    const userDados = await repositoryUser.getByUser(email)

    const usuarioEncontrado = userExists.some(usuario => usuario.email === userDados[0].email);
  
    if (userExists.length == 0 || userExists == undefined) {
        req.headers['authorization'] = ""
        throw new Error('Usuário não localizado.')
    }

    if (usuarioEncontrado) {
        const user = await repositoryUser.edit(id_user, nome, email)
        return user[0]
    }

}

const password = async(req) => {

    const id_user = req.id_user
    const { senha_atual, senha, nova_senha } = req.body
    
    if (senha != nova_senha) {
        throw new Error("As senhas não conferem. Digite novamente.")
    }

    const userExists = await repositoryUser.getById(id_user)
    
    if (userExists.length == 0 || userExists == undefined) {
        req.headers['authorization'] = ""
        throw new Error('Usuário não localizado.')
    }

    const senhaAtual = userExists[0].senha
    
    const isPasswordCurrent = await bcrypt.compare(senha_atual, senhaAtual);
    
    if (!isPasswordCurrent) {
        throw new Error('Confirme a senha atual.')
    }
    
    if (isPasswordCurrent) { 
        const hashPassword = await bcrypt.hash(nova_senha , 10)
        const user = await repositoryUser.password(id_user, hashPassword)
        return user[0]
    }


}

export default { login, register, profile, edit, password }