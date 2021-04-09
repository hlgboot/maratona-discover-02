const {Router} = require("express")

const routes = Router()

// Importação dos controladores
const ProfileController = require("./controllers/ProfileController")
const JobController = require("./controllers/JobController")
const DashboardController = require("./controllers/DashboardController")

// Rotas dos Jobs 
routes.get("/", DashboardController.index)

routes.get("/job", JobController.form)
routes.post("/job", JobController.create)

routes.get("/job/:id", JobController.read)
routes.post("/job/:id", JobController.update)

routes.post("/job/delete/:id", JobController.delete)

// Rotas do Usuário
routes.get("/profile", ProfileController.index)
routes.post("/profile", ProfileController.update)

module.exports = routes
