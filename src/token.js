import jwt, { decode } from 'jsonwebtoken'

const secretToken = "!ABC@"

function createJWT(id_user){

    const token = jwt.sign({ id_user }, secretToken, {
        expiresIn: 999999 
    })

    return token
}

function validateJWT(req, res, next) {

    const authToken = req.headers.authorization

    if (!authToken) {
        return res.status(401).send({ error: "Token não informado." })
    }

    const [aux, token] = authToken.split(" ")

    jwt.verify(token, secretToken, (err, decode) => {
        if (err) {
            return res.status(401).send({ error: "Token inválido." })
        }
        
        req.id_user = decode.id_user

        next()
    })
}

export default { createJWT, validateJWT }