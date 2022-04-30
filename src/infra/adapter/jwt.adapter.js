import * as jwt from 'jsonwebtoken'
import 'dotenv/config'

export class JwtAdapter {
    async generate(data) {
        const { nome, email } = data.user
        const jwtData = {
            user: {
                nome,
                email,
            },
        }

        return jwt.sign({ jwtData }, process.env.TOKEN_SECRET, {
            expiresIn: '9h',
        })
    }
}
