import 'dotenv/config'

export class DbSignIn {
    constructor({ userRepository, cryptoAdapter, jwtAdapter }) {
        this.userRepository = userRepository
        this.cryptoAdapter = cryptoAdapter
        this.jwtAdapter = jwtAdapter
    }

    async execute(Data) {
        const { email, password } = Data

        const findUser = await this.userRepository.findUser({
            email: email.toLowerCase(),
        })

        if (!findUser) {
            return {
                error: 'Usuário não encontrado, crie sua conta',
            }
        }

        const verifyPassword = await this.cryptoAdapter.compareHash(
            findUser.password,
            password
        )

        if (!verifyPassword) {
            return {
                error: 'Senha incorreta',
            }
        }

        const token = await this.jwtAdapter.generate({
            user: findUser,
        })

        const { nome, avatar_path } = findUser

        return {
            message: 'Login realizado com sucesso',
            nome,
            avatar: avatar_path
                ? `${process.env.SERVER_URL}/avatar/${avatar_path}`
                : null,
            token,
        }
    }
}
