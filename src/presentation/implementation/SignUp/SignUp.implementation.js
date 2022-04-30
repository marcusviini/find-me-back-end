export class SignUpImplementation {
    constructor({ dbSignUp }) {
        this.dbSignUp = dbSignUp
    }

    async handle(call) {
        try {
            const response = await this.dbSignUp.execute(call.request)

            if (response.error)
                return {
                    error: response.error,
                }

            return response
        } catch (error) {
            console.log(error)
            return {
                error: 'Ocorreu um problema interno, tente novamente ou fale com o suporte',
            }
        }
    }
}
