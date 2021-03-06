const { validate, errors: { ConflictError } } = require('baam-util')
import call from '../utils/call' //eslint-disable-line
//const call = require('../utils/call')
const API_URL = process.env.REACT_APP_API_URL

//module.exports = function (name, surname, email, nickname, password) {
export default function (name, surname, email, nickname, password) {
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid('surname', surname)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.email(email)
    validate.string(nickname)
    validate.string.notVoid('nickname', nickname)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const res = await call(`${API_URL}/users`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, surname, email, nickname, password})
        })

        if (res.status === 201) return

        if (res.status === 409) throw new  ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}
