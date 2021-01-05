import jwt from 'jsonwebtoken'

const verifyToken = function (req, res, next){
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined')
    {
        try
        {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]
            jwt.verify(bearerToken, '123se14c88retkey420')
            req.token = bearerToken
            next()
        }
        catch(err){
            res.sendStatus(401)
        }
    }
    else
    {
        res.sendStatus(401)
    }
}

const verifyRole =  function (role){
    return function (req, res, next){
        const token = req.token;
        const currentUser = jwt.decode(token, '123se14c88retkey420')
        if (currentUser.korisnik.role != role)
            res.sendStatus(403)
        else
            next()
    }
}


export{
    verifyToken,
    verifyRole
}