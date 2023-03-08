import express from "express"
import routeTodo from "./api.todo.route.js"

const route = express.Router()
route.use("/", express.json())
route.use("/todo", routeTodo)
route.get("/", (req, res) => res.json("api esta aqui"))
export default route