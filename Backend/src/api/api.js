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

import Jelo from '../models/Jelo'


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

//Rezervacije - dobavljanje, brisanje i dodavanje
apiRouter.get("/rezervacije", verifyToken, RezervacijaController.dobaviRezervacije)

apiRouter.post("/rezervacija", verifyToken, RezervacijaController.dodajRezervaciju)

apiRouter.delete("/rezervacija/:rezervacijaId", verifyToken, RezervacijaController.obrisiRezervaciju)

//Jela - dobavljanje jela za restoran, dodavanje jela, brisanje i editovanje
apiRouter.get("/jela", verifyToken, JeloController.dobaviJela);

apiRouter.post("/jelo", verifyToken, JeloController.dodajJelo);

apiRouter.get("/jelo", verifyToken, JeloController.dobaviJelaZaRestoran);

//Brisanje i dodavanje jela za restoran
apiRouter.delete("/restoran/:restoranId/jelo/:jeloId", verifyToken, MeniController.obrisiJeloIzRestorana);
apiRouter.post("/restoran/:restoranId/jelo/:jeloId", verifyToken, MeniController.dodajJeloZaRestoran);

export default apiRouter