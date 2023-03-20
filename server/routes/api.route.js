import express from "express"
import routeTodo from "./api.todo.route.js"

const route = express.Router()
route.use("/", express.json())
route.use("/", routeTodo)
export default route