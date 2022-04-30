import bcrypt from 'bcrypt'
import 'dotenv/config'

const saltRounds = 10

export class CryptoAdapter {
    async createHashPassword(data) {
        const hash = await bcrypt.hash(data, saltRounds).catch((error) => {
            throw new Error('Ocorreu um erro para criptografar a senha')
        })

        return hash
    }

    async compareHash(hash, password) {
        const compare = await bcrypt.compare(password, hash).catch((error) => {
            throw new Error('Ocorreu um erro para verificar a senha')
        })

        return compare
    }
}
