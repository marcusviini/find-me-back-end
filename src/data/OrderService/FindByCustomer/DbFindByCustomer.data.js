export class DbFindByCustomer {
    constructor({ orderServiceRepository }) {
        this.orderServiceRepository = orderServiceRepository
    }

    async execute(Data) {
        const { clienteId } = Data

        const findOs =
            await this.orderServiceRepository.findOrderServiceByCustomer(
                clienteId
            )

        if (!findOs[0]) {
            return {
                error: 'Nenhuma O.S foi encontrada',
            }
        }

        return {
            message: 'Consulta realizada com sucesso',
            os: findOs,
        }
    }
}
