import OrderService from '../schemas/OrderService'

export class OrderServiceRepository {
    async create(data) {
        return await OrderService.create(data)
    }

    async update(_id, data) {
        return await OrderService.findByIdAndUpdate({ _id }, data)
    }

    async findOneOrderService(nome) {
        return await OrderService.findOne({ nome })
    }

    async findOrderServiceByCustomer(clienteId) {
        return await OrderService.find({ clienteId })
    }

    async findOrderServiceByUser(responsavelId) {
        return await OrderService.find({ responsavelId })
    }

    async findAll() {
        return await OrderService.find()
    }
}
