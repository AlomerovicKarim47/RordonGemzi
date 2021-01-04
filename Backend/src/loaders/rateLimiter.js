import rateLimit from 'express-rate-limit'

const loadRateLimiting = ({app}) => { 
    var limiter = rateLimit({
        windowMs: 15*60*1000,
        max: 100, //svaki IP moze 100 requesta unutar windowMs
        delayMs: 0
    })
    app.use(limiter)
    return ({app})
}

export default loadRateLimiting