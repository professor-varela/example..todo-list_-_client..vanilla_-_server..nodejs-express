import express from "express"
import apiRoutes from "./routes/api.route.js"
import cors from "cors"

const app = express()
const port = 3000

app.use(cors())
app.use("/", apiRoutes)
app.listen(port, () => console.log(`⚡ server is running on port ${port}.`))