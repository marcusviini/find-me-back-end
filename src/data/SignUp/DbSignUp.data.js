export class DbSignUp {
    constructor({ userRepository }) {
        this.userRepository = userRepository
    }

    async execute(Data) {
        const { nome, email, password } = Data

        const findUserByEmail = await this.userRepository.findUser({
            email: email.toLowerCase(),
        })

        if (findUserByEmail) {
            return {
                error: 'Já possui um cadastro com este email',
            }
        }

        await this.userRepository.create({
            nome: nome.charAt(0).toUpperCase() + nome.slice(1),
            email: email.toLowerCase(),
            password,
        })

        return {
            message: 'Usuário cadastrado com sucesso',
        }
    }
}
