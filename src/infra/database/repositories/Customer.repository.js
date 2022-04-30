import Customer from '../schemas/Customer'

export class CustomerRepository {
    async create(data) {
        return await Customer.create(data)
    }

    async update(_id, data) {
        return await Customer.findByIdAndUpdate({ _id }, data)
    }

    async findCustomer(data) {
        return await Customer.findOne(data)
    }

    async findAll() {
        return await Customer.find()
    }
}
