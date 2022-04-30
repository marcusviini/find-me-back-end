import mongoose from 'mongoose'

const User = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar_name: {
            type: String,
            required: false,
        },
        avatar_path: {
            type: String,
            required: false,
        },
        password_reset_token: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

export default new mongoose.model('User', User)
