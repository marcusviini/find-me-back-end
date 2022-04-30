export class SignInImplementation {
    constructor({ dbSignIn }) {
        this.dbSignIn = dbSignIn
    }

    async handle(call) {
        try {
            const response = await this.dbSignIn.execute(call.request)

            if (response.error)
                return {
                    error: response.error,
                }

            return response
        } catch (error) {
            return {
                error: 'Ocorreu um problema interno, tente novamente ou fale com o suporte',
            }
        }
    }
}
