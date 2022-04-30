export class FindByCustomerOrderServiceImplementation {
    constructor({ dbFindByCustomer }) {
        this.dbFindByCustomer = dbFindByCustomer
    }

    async handle(call) {
        try {
            const response = await this.dbFindByCustomer.execute(call.request)

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
