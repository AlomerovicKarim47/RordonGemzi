import jwt from 'jsonwebtoken'

const verifyToken = function (req, res, next){
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined')
    {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }
    else
    {
        res.sendStatus(403)
    }
}

const verifyRole =  function (role){
    return function (req, res, next){
        const token = req.token;
        const currentUser = jwt.decode(token, 'secretkey')
        if (currentUser.korisnik.role != role)
            res.sendStatus(401)
        else
            next()
    }
}


export{
    verifyToken,
    verifyRole
}