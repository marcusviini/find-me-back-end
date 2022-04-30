import path from 'path'
import grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'
import { SignUpImplementation } from '../presentation/implementation'

import { DbSignUp } from '../data'

import { UserRepository } from '../infra/database/repositories'

import { adapter } from './adapter/Grpc.adapter'

import 'dotenv/config'
import '../infra/database'

const packageUser = protoLoader.loadSync(
    path.resolve(__dirname, 'pb', 'user.proto'),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
)

const proto = grpc.loadPackageDefinition([packageUser])

const server = new grpc.Server()

const signUpImplementation = () => {
    const userRepository = new UserRepository()
    const dbSignUp = new DbSignUp({
        userRepository,
    })
    return new SignUpImplementation({
        dbSignUp,
    })
}

server.addService(proto[0].service.userService, {
    signUp: adapter(signUpImplementation()),
})

server.bind(
    `0.0.0.0:${process.env.PORT}`,
    grpc.ServerCredentials.createInsecure()
)
server.start()
console.info(`(BACK-END-SERVICE) RUN ON PORT = ${process.env.PORT}`)
