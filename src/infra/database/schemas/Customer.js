import mongoose from 'mongoose'

const Customer = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

Customer.pre('save', function (next) {
    if (this.isNew) {
        this.constructor.find({}).then((result) => {
            this.id = result.length + 1
            next()
        })
    }
})

// eslint-disable-next-line new-cap
export default new mongoose.model('Customer', Customer)
