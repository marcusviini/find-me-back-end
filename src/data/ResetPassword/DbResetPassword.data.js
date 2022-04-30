export class DbResetPassword {
    constructor({ userRepository, cryptoAdapter }) {
        this.userRepository = userRepository
        this.cryptoAdapter = cryptoAdapter
    }

    async execute(Data) {
        const { email, token, password } = Data

        const findUserByEmail = await this.userRepository.findUser({
            email: email.toLowerCase(),
        })

        if (!findUserByEmail) {
            return {
                error: 'Usuário não encontrado',
            }
        }

        if (findUserByEmail.password_reset_token !== token.toLowerCase()) {
            return {
                error: 'Token inválido',
            }
        }

        const verifyPassword = await this.cryptoAdapter.compareHash(
            findUserByEmail.password,
            password
        )

        if (verifyPassword) {
            return {
                error: 'A nova senha não pode ser igual a senha atual',
            }
        }

        // eslint-disable-next-line no-underscore-dangle
        await this.userRepository.update(findUserByEmail._id, {
            password,
            password_reset_token: '',
        })

        return {
            message: `Senha alterada com sucesso`,
        }
    }
}
