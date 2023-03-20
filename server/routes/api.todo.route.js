import express from "express"
import database from "../database.js"

const route = express.Router()

// load
route.get("/", async (req, res) => {
  console.log("READED ITENS")
  const db = await database()
  const result = await db.all('SELECT * FROM todo')
  res.json(result)
})

// create
route.post("/", async (req, res) => {
  console.log("CREATED NEW ITEM")
  const db = await database()
  const result = await db.run('INSERT INTO todo(texto) VALUES(?)', [req.body.texto])
  res.json({ id: result.lastID })
})

// update
route.put("/:id", async (req, res) => {
  console.log("UPDATED", req.params.id)
  const db = await database()
  const result = await db.run('UPDATE todo SET done=? WHERE id=?', [req.body.done, req.params.id])
  res.json({ id: result.lastID, done: req.body.done })
})

// delete
route.delete("/:id", async (req, res) => {
  console.log("DELETED", req.params.id)
  const db = await database()
  const result = await db.run('DELETE FROM todo WHERE id=?', [req.params.id])
  res.json(result)
})

export default route