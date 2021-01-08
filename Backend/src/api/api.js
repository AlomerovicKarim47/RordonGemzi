import {Router} from 'express'
import KorisnikController from '../controllers/KorisnikController.js'
import RestoranController from '../controllers/RestoranController.js'
import RezervacijaController from '../controllers/RezervacijaController.js'
import MeniController from '../controllers/MeniController.js'
import JeloController from '../controllers/JeloController.js'
import {verifyToken, verifyRole} from '../middleware/index.js'

import validation from '../middleware/validation.js'


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
apiRouter.get("/rezervacije", verifyToken, verifyRole("admin"), RezervacijaController.dobaviRezervacije)

apiRouter.post("/rezervacija", verifyToken, validation.validateDodajRezervaciju, validation.checkValidationResults, RezervacijaController.dodajRezervaciju)

apiRouter.delete("/rezervacija/:rezervacijaId", verifyToken, verifyRole("admin"), validation.validateObrisiRezervaciju, validation.checkValidationResults, RezervacijaController.obrisiRezervaciju)

//Jela - dobavljanje jela za restoran, dodavanje jela, brisanje i editovanje
apiRouter.get("/jela", verifyToken, verifyRole("admin"), JeloController.dobaviJela);

apiRouter.post("/jelo", verifyToken, verifyRole("admin"), validation.validateDodajJelo, validation.checkValidationResults, JeloController.dodajJelo);

apiRouter.get("/jelo", verifyToken, JeloController.dobaviJelaZaRestoran);

apiRouter.delete("/jelo/:jeloId", verifyToken, verifyRole("admin"),validation.validateObrisiJelo, validation.checkValidationResults, JeloController.obrisiJelo )

//Brisanje i dodavanje jela za restoran
apiRouter.delete("/restoran/:restoranId/jelo/:jeloId", verifyToken, verifyRole("admin"), validation.validateBrisiDodajIzRestorana, validation.checkValidationResults, MeniController.obrisiJeloIzRestorana);
apiRouter.post("/restoran/:restoranId/jelo/:jeloId", verifyToken, verifyRole("admin"), validation.validateBrisiDodajIzRestorana, validation.checkValidationResults, MeniController.dodajJeloZaRestoran);

export default apiRouter