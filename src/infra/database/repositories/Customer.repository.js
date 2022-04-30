import Customer from '../schemas/Customer'

export class CustomerRepository {
    async create(data) {
        return await Customer.create(data)
    }

    async update(_id, data) {
        return await Customer.findByIdAndUpdate({ _id }, data)
    }

    async findOneCustomer(nome) {
        return await Customer.findOne({ nome })
    }

    async findCustomerById(id) {
        return await Customer.findOne({ id })
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
