import { query } from "../database/sqlite.js"

const register = async(nome, email, senha) => {
    
    let sql = `INSERT INTO usuario(nome, email, senha)VALUES(?, ?, ?) RETURNING id_usuario`
    const user = await query(sql, [nome, email, senha])
    return user

}

const edit = async(id, nome, email) => {

    let sql = `UPDATE usuario SET nome = ?, email = ? WHERE id_usuario = ? RETURNING id_usuario`
    const user = await query(sql, [nome, email, id])
    return user

}

const password = async(id, senha) => {

    let sql = `UPDATE usuario SET senha = ? WHERE id_usuario = ? RETURNING id_usuario`
    const user = await query(sql, [senha, id])
    return user

}

const getByUser = async(email) => {

    let sql = `SELECT * FROM usuario WHERE email = ?`
    const user = await query(sql, [email])
    return user

}

const getById = async(id) => {

    let sql = `SELECT id_usuario, nome, email, senha FROM usuario WHERE id_usuario = ?`
    const user = await query(sql, [id])
    return user

}

export default { register, edit, password, getByUser, getById }