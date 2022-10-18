const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/info',(request,response) =>{
    const str=('<p>PhoneBook has info of '+persons.length+' people </p>')
    const str2=(new Date())
    response.send(str+str2)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id',(request, response) => {
    const id=Number(request.params.id)
    const p=persons.find(p => p.id === id)
    if(p){
        response.json(p)
    }
    else{
        response.status(404).end()
    }
})
const generateId = () =>{
    return Math.floor(Math.random()*(10000)+0)
}
app.post('/api/persons', (request, response) => {
    const body=request.body
    if(!body.name){ 
        return response.status(400).json({error:'name missing'})
    }
    if(!body.number){ 
        return response.status(400).json({error:'number missing'})
    }
    if(persons.find(p => p.name === body.name)!== undefined){
        return response.status(400).json({error:'name must be unique'})
    }
    const person={
        id: generateId(),
        name:body.name,
        number:body.number,
    }
    persons=persons.concat(person)
    response.json(note)
})

app.delete('/api/persons/:id',(request, response)=>{
    const id=Number(request.params.id)
    persons=persons.filter(p => p.id !== id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})