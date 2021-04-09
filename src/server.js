const Express = require("express")
const routes = require("./Routes")
const path = require("path")

const App = Express()

App.set("view engine", "ejs")

App.set("views", path.join(__dirname, "views"))

App.use(Express.static("public"))

App.use(Express.json())

App.use(Express.urlencoded({extended: true}))

App.use("/", routes)

App.listen(5555, () => console.log("Server is running 🚀"))
 