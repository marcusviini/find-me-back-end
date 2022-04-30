import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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

User.pre('save', function (next) {
    const user = this

    if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

// eslint-disable-next-line new-cap
export default new mongoose.model('User', User)
