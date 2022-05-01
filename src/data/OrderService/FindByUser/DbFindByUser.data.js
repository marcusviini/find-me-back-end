export class DbFindByUser {
    constructor({ orderServiceRepository }) {
        this.orderServiceRepository = orderServiceRepository
    }

    async execute(Data) {
        const { userId } = Data

        const findOs = await this.orderServiceRepository.findOrderServiceByUser(
            userId
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
