import express from "express"
import apiRoutes from "./routes/api.route.js"

const app = express()
const port = 3000

app.use("/", express.static("./public"))
app.use("/api", apiRoutes)
app.listen(port, () => console.log(`⚡ server is running on port ${port}.`))