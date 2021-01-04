import {Router} from 'express'
import {helloWorldController} from '../controllers/TestControllers'
import KorisnikController from '../controllers/KorisnikController'
import RestoranController from '../controllers/RestoranController'
import RezervacijaController from '../controllers/RezervacijaController'
import MeniController from '../controllers/MeniController'
import JeloController from '../controllers/JeloController'
import {verifyToken, verifyRole} from '../middleware/index'
import validation from '../middleware/validation'
import { body } from 'express-validator'

const apiRouter = Router()

//apiRouter.get("/", helloWorldController)

//Korisnici - registracija, login, autentifikacija i autorizacija, dobavljanje liste korisnika
apiRouter.post("/register", validation.validateRegister, validation.checkValidationResults, KorisnikController.registrujKorisnika)

apiRouter.post("/login", validation.validateLogin, validation.checkValidationResults, KorisnikController.login)

apiRouter.put("/uloga", verifyToken, verifyRole('admin'), validation.validateUloga, validation.checkValidationResults, KorisnikController.izmjeniUlogu)

apiRouter.get("/korisnici", verifyToken, verifyRole("admin"), KorisnikController.dobaviKorisnike)

//Restorani - dobavljanje, brisanje, dodavanje
apiRouter.get("/restorani", verifyToken, RestoranController.dobaviRestorane)

apiRouter.delete("/restoran/:restoranId", verifyToken, verifyRole('admin'), validation.validateObrisiRestoran, validation.checkValidationResults, RestoranController.obrisiRestoran)

apiRouter.post("/restoran", verifyToken, verifyRole('admin'), validation.validateDodajRestoran, validation.checkValidationResults, RestoranController.dodajRestoran)

//Rezervacije
apiRouter.get("/rezervacije", verifyToken, RezervacijaController.dobaviRezervacije)


export default apiRouter