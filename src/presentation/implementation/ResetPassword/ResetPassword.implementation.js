export class ResetPasswordImplementation {
    constructor({ dbResetPassword }) {
        this.dbResetPassword = dbResetPassword
    }

    async handle(call) {
        try {
            const response = await this.dbResetPassword.execute(call.request)

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
