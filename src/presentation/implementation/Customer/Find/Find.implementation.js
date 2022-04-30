export class FindCustomerImplementation {
    constructor({ dbFindCustomer }) {
        this.dbFindCustomer = dbFindCustomer
    }

    async handle(call) {
        try {
            const response = await this.dbFindCustomer.execute(call.request)

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
