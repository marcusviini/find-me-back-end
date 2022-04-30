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

    async findAll() {
        return await OrderService.find()
    }
}
