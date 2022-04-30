export class CreateOrderServiceImplementation {
    constructor({ dbCreateOrderService }) {
        this.dbCreateOrderService = dbCreateOrderService
    }

    async handle(call) {
        try {
            const response = await this.dbCreateOrderService.execute(
                call.request
            )

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
