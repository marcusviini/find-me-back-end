export class DbCreateCustomer {
    constructor({ customerRepository }) {
        this.customerRepository = customerRepository
    }

    async execute(Data) {
        const { nome } = Data

        const findCustomer = await this.customerRepository.findOneCustomer(nome)

        if (findCustomer) {
            return {
                error: 'Já possui um cadastro para esse cliente',
            }
        }

        await this.customerRepository.create({
            nome,
        })

        return {
            message: 'Cliente cadastrado com sucesso',
        }
    }
}
