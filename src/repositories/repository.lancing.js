import { query } from "../database/sqlite.js"

const summary = async(id_usuario) => {
    let sql = `select 
        SUM(case when l.tipo = 'R' then l.valor else 0 end) as receitas,
        SUM(case when l.tipo = 'D' then l.valor else 0 end) as despesas
        from lancamento l 
        where l.id_usuario = ?
        AND l.dt_lancamento >= date('now', 'start of month')
        AND l.dt_lancamento <= date('now', 'start of month', '+1 month', '-1 day')`

    const lancing =  await query(sql, [id_usuario])

    sql = `SELECT l.*, c.categoria, c.icone
    FROM lancamento l JOIN categoria c ON (c.id_categoria = l.id_categoria AND c.id_usuario = l.id_usuario)
    WHERE l.id_usuario = ? ORDER BY l.id_lancamento DESC LIMIT 10`

    const lastLancing =  await query(sql, [id_usuario])

    let retorno = {
        totais: lancing[0],
        lancamentos:lastLancing
    }

    return retorno
}

const list = async(id_usuario, dt_filtro, busca, id_lancamento) => {
    
    let filtro = [id_usuario]
    
    let sql = `SELECT l.*, c.categoria, c.icone
    FROM lancamento l JOIN categoria c ON (c.id_categoria = l.id_categoria AND c.id_usuario = l.id_usuario)
    WHERE l.id_usuario = ? 
    `

    if (busca) {
        filtro.push("%"+ busca +"%")
        sql = sql + ` AND l.descricao LIKE ? `
    }

    if (dt_filtro) {
        filtro.push(dt_filtro)
        sql = sql + ` AND l.dt_lancamento >= ? `
        filtro.push(dt_filtro)
        sql = sql + ` and l.dt_lancamento <= date(? , 'start of month', '+1 month', '-1 day')`
    }

    if (id_lancamento) {
        filtro.push(id_lancamento)
        sql = sql + ` AND l.id_lancamento = ? `
    }
    
    sql = sql + ` ORDER BY c.categoria DESC`

    const lancing =  await query(sql, filtro)
    return lancing
}

const listByCategoy = async(id_usuario, id_categoria) => {
    let sql = `SELECT * FROM lancamento WHERE id_usuario = ? AND id_categoria = ?
    `
    const lancing =  await query(sql, [id_usuario, id_categoria])
    return lancing
}

const insert = async(id_usuario, descricao, valor, id_categoria, tipo, dt_lancamento) => {
    let sql = `INSERT INTO lancamento (id_usuario, descricao, valor, id_categoria, tipo, dt_lancamento)
    VALUES(?, ?, ?, ?, ?, ?) RETURNING id_lancamento
    `
    const lancing =  await query(sql, [id_usuario, descricao, valor, id_categoria, tipo, dt_lancamento])
    return lancing
}

const edit = async(descricao, valor, id_categoria, tipo, dt_lancamento, id_lancamento, id_usuario) => {
    let sql = `UPDATE lancamento SET descricao =?, valor=?, id_categoria=?, tipo=?, dt_lancamento=?
    WHERE id_lancamento = ? AND  id_usuario =?
    `
    await query(sql, [descricao, valor, id_categoria, tipo, dt_lancamento, id_lancamento, id_usuario])
    return { id_lancamento }
}

const exlude = async(id_lancamento, id_usuario) => {
    
    let sql = `DELETE FROM lancamento WHERE id_lancamento = ? AND id_usuario = ?`
    await query(sql, [id_lancamento, id_usuario])
    return id_lancamento
}

export default { summary, insert, list, listByCategoy, edit, exlude }