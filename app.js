const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

/**
 * function makeId
 * @returns an id of type number having 7 digits 
 */
function makeId() {
    return Math.floor(Math.random() * 10000000);
}

/**
 * 
 * Checks if an id already exists.
 * If yes, returns true. Otherwise false.
 */
function idExists(id) {
    const result = allUsers.find(user => user.id === id);
    if (result) return true;
    return false;
}

// Server base
app.get('/', (req, res) => {
    res.status(200).end('Basic Material server');
});

// GET ALL USERS
app.get('/users', (req, res) => {
    res.status(200).json(allUsers);
});

// GET ONE USER BY ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const foundUser = allUsers.find(user => user.id === userId);
    res.status(200).json({ ...foundUser });
});

/**
 * ADD A NEW USER
 */
app.post('/users', (req, res) => {
    let id = makeId();
    while (idExists(id)) {
        id = makeId();
    }

    const newUser = { id: id, ...req.body };
    allUsers.push(newUser);

    const msg = "User added with id: " + id;
    console.log(msg);
    res.status(200).json({ message: msg });
});

// Delete an user
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userFound = allUsers.find(user => user.id === userId);
    if (userFound) {
        console.log("User deleted with id:", userId);
        allUsers = allUsers.filter(user => user.id !== userId);
    }
    else {
        console.log("User not found with id:", userId);
    }
    const response = {
        success: true,
        message: "Delete operation successfull",
        userId: userId
    };
    res.status(200).json(response);
});

app.put('/users', (req, res) => {
    console.log("Old array:");
    console.log(allUsers);
    const gotUser = req.body;
    const userIndex = allUsers.indexOf(allUsers.find(user => user.id === gotUser.id));
    allUsers[userIndex] = gotUser;
    console.log("New array:");
    console.log(allUsers);
    res.status(200).json({ message: "Server response: user updated!" });
});

app.listen(port, () => {
    console.log("Basic Material server is runnning on http://localhost:", port);
});

// Dummy users
let allUsers = [
    {
        id: 4210099,
        userName: "Jannatul Ferdous",
        sex: "female",
        position: "Digital Marketer"
    },
    {
        id: 4210100,
        userName: "Suja Tanvir Ahmed",
        sex: "male",
        position: "Fullstack Developer"
    },
    {
        id: 4210101,
        userName: "Zitan Chowdhury",
        sex: "male",
        position: "Backend Developer"
    },
    {
        id: 4210102,
        userName: "Sazia Ahmed",
        sex: "female",
        position: "Frontend Developer"
    },
    {
        id: 4210103,
        userName: "Mahfuz Sarker",
        sex: "male",
        position: "Backend Developer"
    }
];
