import { query } from "../database/sqlite.js"

const list = async(id_usuario, id_categoria) => {   
    
    let filtro = [id_usuario] 
    
    let sql = `SELECT * FROM categoria WHERE id_usuario = ? `
    
    
    if (id_categoria) {
        sql = sql + ` AND id_categoria = ? `
        filtro.push(id_categoria)
    }

    sql = sql + ` ORDER BY categoria`
    
    const category = await query(sql, filtro)
    
    return category
}

const listIcons = async() => {    
    let sql = `SELECT id_icone, 'http://192.168.0.3:3001/' || icone as icone FROM icone ORDER BY id_icone`
    const icones = await query(sql, [])
    return icones

}

const insert = async(id_usuario, categoria, icone) => {
    let sql = `INSERT INTO categoria(id_usuario, categoria, icone)VALUES(?, ?, ?) RETURNING id_categoria`
    const category = await query(sql, [id_usuario, categoria, icone])
    return category
}

const edit = async(id_categoria, id_usuario, categoria, icone) => {
    let sql = `UPDATE categoria SET categoria = ?, icone = ? WHERE id_categoria = ? AND id_usuario = ? RETURNING id_categoria`
    const category = await query(sql, [categoria, icone, id_categoria, id_usuario])    
    return category
}

const exlude = async(id_categoria, id_usuario) => {
    let sql = `DELETE FROM categoria WHERE id_categoria = ? AND id_usuario = ?`
    await query(sql, [id_categoria, id_usuario])
    return id_categoria
}

export default { list, listIcons, insert, edit, exlude }