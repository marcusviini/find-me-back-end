export class DbFindCustomer {
    constructor({ customerRepository }) {
        this.customerRepository = customerRepository
    }

    async execute(Data) {
        const { nome } = Data

        const findCustomer = await this.customerRepository.findCustomer(nome)

        if (!findCustomer) {
            return {
                error: 'Cliente não encontrado',
            }
        }

        return {
            message: 'Consulta realizada com sucesso',
            customers: findCustomer,
        }
    }
}
