import {Router} from 'express'
import {helloWorldController} from '../controllers/TestControllers'
import KorisnikController from '../controllers/KorisnikController'
import RestoranController from '../controllers/RestoranController'
import RezervacijaController from '../controllers/RezervacijaController'
import MeniController from '../controllers/MeniController'
import JeloController from '../controllers/JeloController'
import {verifyToken} from '../middleware/index'

const apiRouter = Router()

apiRouter.get("/", helloWorldController)

apiRouter.post("/register", KorisnikController.registrujKorisnika)

apiRouter.post("/login", KorisnikController.login)

apiRouter.get("/rezervacije", verifyToken, RezervacijaController.dobaviRezervacije)


export default apiRouter