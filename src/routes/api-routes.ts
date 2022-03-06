import express from 'express';
import { getUserData, saveUserData } from '../controllers/user';
import { User } from '../models/user'

const router = express.Router();


router.get(
    '/api/users/list', (req: express.Request, res: express.Response) => {

        const currentUsers: User[] = getUserData();
        console.log('usuarios actuales', currentUsers)
        res.send(currentUsers)

    }
);

router.post('/api/users/add', (req: express.Request, res: express.Response) => {

    const currentUsers: User[] = getUserData();
    console.log('body con  el parser', req.body)
    const userData: User = req.body;
    console.log(userData);
    currentUsers.push(userData)
    console.log('usuarios actuales', currentUsers)

    saveUserData(currentUsers)
    res.send({ success: true, message: 'user added successfully' })

})

router.patch('/api/users/update/:id', (req, res) => {

    const userId = Number(req.params.id)
    const userData: User = req.body

    const currentUsers: User[] = getUserData()
    console.log('current users', currentUsers)
    const findExist = currentUsers.find(element => element.id === userId)
    console.log('el existente', findExist)
    if (!findExist) {
        return res.status(409).send({ error: true, message: 'User does not exist' })
    }

    findExist['nombre'] = userData.nombre;
    console.log(findExist);
    const updatedUsers = currentUsers.filter((user) => user.id !== userId)

    updatedUsers.push(findExist)

    saveUserData(updatedUsers)
    res.send({ success: true, msg: 'User updated successfully' })
})

router.delete('/api/users/delete/:id', (req, res) => {
    const userId = Number(req.params.id)

    const currentUsers: User[] = getUserData()

    const filterUser = currentUsers.filter(user => user.id !== userId)

    saveUserData(filterUser)
    res.send({ success: true, msg: 'User removed successfully' })

})

export { router as apiRoutes };
