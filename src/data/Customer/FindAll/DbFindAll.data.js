export class DbFindAllCustomer {
    constructor({ customerRepository }) {
        this.customerRepository = customerRepository
    }

    async execute(Data) {
        const findAllCustomer = await this.customerRepository.findAll()

        if (!findAllCustomer) {
            return {
                error: 'Cliente não  encontrado',
            }
        }

        return {
            message: 'Consulta realizada com sucesso',
            customers: findAllCustomer,
        }
    }
}
