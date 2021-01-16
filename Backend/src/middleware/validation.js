import { body, param, validationResult } from 'express-validator'

//Validacije

//Korisnik
const validateRegister =
    [body("ime").notEmpty().escape(),
    body("prezime").notEmpty().escape(),
    body("username").notEmpty().escape(),
    body("password").notEmpty().isLength({ min: 8 }).escape(),
    body("email").isEmail().escape()]

const validateLogin = [
    body("username").notEmpty().escape(),
    body("password").notEmpty().escape()
]

const validateUloga = [
    body("role").isIn(["admin", "user"])
]

//Restoran
const validateDodajRestoran = [
    body("naziv").notEmpty().escape(),
    body("adresa").notEmpty().escape(),
    body("brojMjesta").notEmpty().isNumeric(),
    body("brojDostupnihMjesta").notEmpty().isNumeric().custom((value, { req }) => {
        return value === req.body.brojMjesta
    })
]

const validateObrisiRestoran = [
    param("restoranId").notEmpty().isNumeric(),
]

//Rezervacija
const validateDodajRezervaciju = [
    body("restoranId").notEmpty().isNumeric(),
    body("brojOsoba").notEmpty().isNumeric().custom((value, { req }) => {
        return value >= 1 && value <= 6
    }),
    body("datum").isDate({
        format: "DD/MM/YYYY"
    }),
    body("vrijeme").notEmpty().custom((value) => {
        return /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/.test(value)
    }),

    body("userId").notEmpty().isNumeric(),
]

const validateObrisiRezervaciju = [
    param("rezervacijaId").notEmpty().isNumeric()
]

//Jelo
const validateDodajJelo = [
    body("naziv").notEmpty().escape(),
    body("opis").notEmpty().escape(),
    body("cijena").notEmpty().isNumeric()
]

//Brisanje i dodavanje jela iz restorana
const validateBrisiDodajIzRestorana = [
    param("restoranId").notEmpty().isNumeric(),
    param("jeloId").notEmpty().isNumeric()
]

//Brisanje jela
const validateObrisiJelo = [
    param("jeloId").notEmpty().isNumeric()
]

//Provjera da li je validacija prosla
const checkValidationResults = (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.statusCode = 400
        res.end(JSON.stringify(errors))
        return
    }
    next()
}

const validation = {
    validateRegister,
    validateLogin,
    validateUloga,
    validateDodajRestoran,
    validateObrisiRestoran,
    validateDodajRezervaciju,
    validateObrisiRezervaciju,
    validateDodajJelo,
    validateBrisiDodajIzRestorana,
    validateObrisiJelo,
    checkValidationResults
}

export default validation
