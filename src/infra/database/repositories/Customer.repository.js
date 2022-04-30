import Customer from '../schemas/Customer'

export class CustomerRepository {
    async create(data) {
        return await Customer.create(data)
    }

    async update(_id, data) {
        return await Customer.findByIdAndUpdate({ _id }, data)
    }

    async findCustomer(nome) {
        return await Customer.find({
            nome: { $regex: `.*${nome}.*` },
        }).limit(5)
    }

    async findAll() {
        return await Customer.find()
    }
}
