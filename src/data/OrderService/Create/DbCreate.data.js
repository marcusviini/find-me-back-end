export class DbCreateOrderService {
    constructor({
        customerRepository,
        userRepository,
        orderServiceRepository,
    }) {
        this.customerRepository = customerRepository
        this.userRepository = userRepository
        this.orderServiceRepository = orderServiceRepository
    }

    async execute(Data) {
        const { clienteId, problema, responsavelId } = Data

        const findCustomer = await this.customerRepository.findCustomerById(
            clienteId
        )

        if (!findCustomer) {
            return {
                error: 'Cliente não encontrado',
            }
        }

        const findUser = await this.userRepository.findUserById(responsavelId)

        if (!findUser) {
            return {
                error: 'Usuário não encontrado',
            }
        }

        await this.orderServiceRepository.create({
            cliente: findCustomer.nome,
            clienteId,
            problema,
            responsavel: findUser.nome,
            responsavelId,
        })

        return {
            message: 'O.s cadastrada com sucesso',
        }
    }
}
