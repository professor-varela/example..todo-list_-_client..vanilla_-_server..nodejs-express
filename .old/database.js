import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let _db = null

export default async function() {
  if (_db)
    return _db

  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS todo (
      id    INTEGER PRIMARY KEY AUTOINCREMENT,
      texto TEXT    NOT NULL,
      done  BOOLEAN DEFAULT FALSE
    )
  `)

  _db = db

  return _db
}