export class FindByUserOrderServiceImplementation {
    constructor({ dbFindByUser }) {
        this.dbFindByUser = dbFindByUser
    }

    async handle(call) {
        try {
            const response = await this.dbFindByUser.execute(call.request)

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
