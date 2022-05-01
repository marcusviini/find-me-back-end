export class DbSendToken {
    constructor({ userRepository, mailAdapter }) {
        this.userRepository = userRepository
        this.mailAdapter = mailAdapter
    }

    async execute(Data) {
        const { email } = Data

        const findUserByEmail = await this.userRepository.findUser({
            email: email.toLowerCase(),
        })

        if (!findUserByEmail) {
            return {
                error: 'Usuário não encontrado',
            }
        }

        const password_reset_token = (Math.random() + 1)
            .toString(36)
            .substring(7)

        // eslint-disable-next-line no-underscore-dangle
        await this.userRepository.update(findUserByEmail._id, {
            password_reset_token,
        })

        const [, restSplit] = email.split('@')

        this.mailAdapter.sendToken({
            username: findUserByEmail.nome,
            token: password_reset_token.toLowerCase(),
            email: email.toLowerCase(),
        })

        return {
            message: `Foi enviado um token de recuperação para *****@${restSplit}`,
        }
    }
}
