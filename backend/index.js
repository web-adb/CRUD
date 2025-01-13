const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { PrismaClient } = require('@prisma/client')
const cors = require('cors')
const app = express()

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(`Backend Berjalan di PORT ${PORT}`)
});

app.get('/users', async (req, res) => {
    const getUsers = await prisma.user.findMany();
    res.json(getUsers)
})

app.get('/users/:id', async(req,res) => {
    const getId = parseInt(req.params.id)
    try {
        const userDetail = await prisma.user.findUnique({
            where:{
                id : getId
            }
        })
        res.json(userDetail)
    } catch (error) {
        res.send('ada sesuatu yang salah')
    }
})

app.post('/users', async(req, res) => {
    const { name, email } = req.body
    try {
        const createUser = await prisma.user.create({
            data: {
                name, email
            }
        })
        res.json(createUser)
    } catch (error) {
        res.send('ada sesuatu yang salah')
    }
})

app.delete('/users/:id', async (req, res) => {
    const usersId = parseInt(req.params.id)
    try {
        await prisma.user.delete({
            where: {
                id : usersId
            }
        })
        res.send('applikasi berhasil di hapus')
    } catch (error) {
        
    }
})


app.put('/users/:id', async(req,res) => {
    const { name, email } = req.body
    const usersId = parseInt(req.params.id)
    try {
        const updateUser = await prisma.user.update({
            where: {
                id : usersId
            },
            data: {
                name,email
            }
        })
        res.json(updateUser);
    } catch (error) {
        res.send('ada yang error')
    }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`applikasi ini berjalan di PORT ${PORT}`)
});

