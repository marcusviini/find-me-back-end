import * as jwt from 'jsonwebtoken'
import 'dotenv/config'

export class JwtAdapter {
    async generate(data) {
        const { nome, email, id } = data.user
        const jwtData = {
            user: {
                nome,
                email,
                id,
            },
        }

        return jwt.sign({ jwtData }, process.env.TOKEN_SECRET, {
            expiresIn: '9h',
        })
    }
}
