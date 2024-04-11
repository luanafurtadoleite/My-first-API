import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';


const port = 3001;
const app = express();

app.use(express.json());
app.use(cors())


const users = []

const checkUserId = (request, response, next) => {
    const {id} = request.params

    const index = users.findIndex( user => user.id === id )

    if( index < 0 ){
        return response.status(404).json({error: "User not found"})
    }

    request.userIndex = index
    request.userId = id
}

app.get('/', (request, response) => {
    return response.json({Mensagem: "oi"});
});

app.get('/users', (request, response) => {
    return response.json(users);
});

app.post('/users', (request, response) => {
    const {name, age} = request.body
    const user = { id: uuidv4(), name, age };

    users.push(user)

    return response.status(201).json(user);
});

app.put('/users/:id', (request, response) => {
    const{name, age} = request.body
    const id = request.params.id
    const index = users.findIndex(user => user.id === id);
    
    const updateUser = { id: id, name, age }
     
    users[index] = updateUser

    return response.json(users[index]);

});

app.delete('/users/:id', (request, response) => {
    const id = request.params.id
    const index = users.findIndex(user => user.id === id);

    users.splice( index, 1 )

    return response.status(204).json();
});

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`);
});


app.use('/users/:id', checkUserId);
