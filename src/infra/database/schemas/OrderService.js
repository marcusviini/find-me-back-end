import mongoose from 'mongoose'

const OrderService = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: false,
        },
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },
        cliente: {
            type: String,
            required: true,
        },
        clienteId: {
            type: Number,
            required: true,
        },
        problema: {
            type: String,
            required: true,
        },
        responsavel: {
            type: String,
            required: true,
        },
        responsavelId: {
            type: Number,
            required: true,
        },
        encerrada: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

OrderService.pre('save', function (next) {
    if (this.isNew) {
        this.constructor.find({}).then((result) => {
            this.id = result.length + 1
            next()
        })
    }
})

// eslint-disable-next-line new-cap
export default new mongoose.model('OrderService', OrderService)
