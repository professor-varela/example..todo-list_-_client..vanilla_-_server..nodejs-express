const load = async (list) => {
  const request = await fetch("/api/todo")
  const response = await request.json()
  response.forEach(({ texto, id, done }) => list.append(createDomItem(texto, id, done)))
}

const create = async (li) => {
  const texto = li.querySelector(".texto").innerText
  
  const status = li.querySelector(".status")
  
  status.innerText = "create: sincronizando"

  const request = await fetch("/api/todo", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto })
  })

  if (request.status < 200 || request.status > 299) {
    status.innerText = `erro ${request.status}`
    return
  }

  const response = await request.json()

  li.dataset.id = response.id
  
  status.innerText = `sincronizado`
}

const update = async (li) => {
  const id = li.dataset.id
  if (!id) return
  const status = li.querySelector(".status")
  
  status.innerText = `update: sincronizando`
  
  const request = await fetch(`/api/todo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done: !li.classList.contains("done") })
  })
  
  if (request.status < 200 || request.status > 299) {
    status.innerText = `erro ${request.status}`
    return
  }
  
  const response = await request.json()  
  
  response.done
    ? li.classList.add("done")
    : li.classList.remove("done")
  
  status.innerText = `sincronizado`
}

const deleteData = async (li) => {
  const id = li.dataset.id
  if (!id) return
  
  const status = li.querySelector(".status")
  
  status.innerText = `excluindo`
  
  const request = await fetch(`/api/todo/${id}`, { method: 'DELETE' })
  
  if (request.status < 200 || request.status > 299) {
    status.innerText = `erro ${request.status}`
    return
  }
  
  li.remove()
}

const createDomItem = (text, id, done) => {
  const li = document.createElement("li")
  const deleteBt = document.createElement("button")
  const doneBt = document.createElement("button")
  const status = document.createElement("span")
  const label = document.createElement("span")

  label.className = "texto"
  label.innerText = text

  status.className = "status"
  status.innerText = "não sincronizado"

  deleteBt.innerText = "excluir"
  doneBt.innerText = "feito"

  deleteBt.addEventListener("click", () => deleteData(li))
  doneBt.addEventListener("click", () => update(li))

  if (id) {
    li.dataset.id = id
    status.innerText = "carregado"
  }

  if (done) {
    li.classList.add("done")
  }

  li.append(label, doneBt, deleteBt, status)

  return li
}


const container = document.body
const searchHeader = document.createElement("div")
const input = document.createElement("input")
const list = document.createElement("ul")
const showHide = document.createElement("select")

showHide.innerHTML = `
  <option value="all">all</option>
  <option value="done">done</option>
  <option value="to-do">to-do</option>
`

input.addEventListener("keyup", ev => {
  if (ev.key != "Enter") return
  if (input.value.trim() == "") return
  const li = createDomItem(input.value)
  list.append(li)
  create(li)
  input.value = ""
})

showHide.addEventListener("change", ev => {
  list.dataset.show = showHide.value
})

load(list)

searchHeader.append(input, showHide)
container.append(searchHeader, list)
