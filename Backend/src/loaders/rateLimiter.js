import rateLimit from 'express-rate-limit'

const loadRateLimiting = ({app}) => { 
    var limiter = rateLimit({
        windowMs: 10*1000,
        max: 10, //svaki IP moze 100 requesta unutar windowMs
        delayMs: 0
    })
    app.use(limiter)
    return ({app})
}

export default loadRateLimiting