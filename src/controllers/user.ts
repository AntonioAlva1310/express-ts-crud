const fs = require("fs");
import { User } from '../models/user'

const saveUserData: any = (data: User): any => {

    const stringifyData: String = JSON.stringify(data)
    fs.writeFileSync('users.json', stringifyData)
}

const getUserData: any = () => {
    const jsonData: any = fs.readFileSync('users.json')
    return JSON.parse(jsonData)
}

export {
    getUserData as getUserData,
    saveUserData as saveUserData,
}