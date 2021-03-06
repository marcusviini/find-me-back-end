import path from 'path'
import grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'
import {
    SignUpImplementation,
    SignInImplementation,
    SendTokenImplementation,
    ResetPasswordImplementation,
    CreateCustomerImplementation,
    FindCustomerImplementation,
    FindAllCustomerImplementation,
    CreateOrderServiceImplementation,
    FindByCustomerOrderServiceImplementation,
    FindByUserOrderServiceImplementation,
} from '../presentation/implementation'

import {
    DbSignUp,
    DbSignIn,
    DbSendToken,
    DbResetPassword,
    DbCreateCustomer,
    DbFindCustomer,
    DbFindAllCustomer,
    DbCreateOrderService,
    DbFindByCustomer,
    DbFindByUser,
} from '../data'

import { CryptoAdapter, JwtAdapter, MailAdapter } from '../infra/adapter'

import {
    UserRepository,
    CustomerRepository,
    OrderServiceRepository,
} from '../infra/database/repositories'

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

const packageCustomer = protoLoader.loadSync(
    path.resolve(__dirname, 'pb', 'customer.proto'),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
)

const packageOrderService = protoLoader.loadSync(
    path.resolve(__dirname, 'pb', 'orderService.proto'),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
)

const proto = grpc.loadPackageDefinition([
    packageUser,
    packageCustomer,
    packageOrderService,
])

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

const signInImplementation = () => {
    const userRepository = new UserRepository()
    const cryptoAdapter = new CryptoAdapter()
    const jwtAdapter = new JwtAdapter()
    const dbSignIn = new DbSignIn({
        userRepository,
        cryptoAdapter,
        jwtAdapter,
    })
    return new SignInImplementation({
        dbSignIn,
    })
}

const sendTokenImplementation = () => {
    const userRepository = new UserRepository()
    const mailAdapter = new MailAdapter()
    const dbSendToken = new DbSendToken({
        userRepository,
        mailAdapter,
    })
    return new SendTokenImplementation({
        dbSendToken,
    })
}

const resetPasswordImplementation = () => {
    const userRepository = new UserRepository()
    const cryptoAdapter = new CryptoAdapter()
    const dbResetPassword = new DbResetPassword({
        userRepository,
        cryptoAdapter,
    })
    return new ResetPasswordImplementation({
        dbResetPassword,
    })
}

server.addService(proto[0].service.userService, {
    signUp: adapter(signUpImplementation()),
    signIn: adapter(signInImplementation()),
    sendToken: adapter(sendTokenImplementation()),
    resetPassword: adapter(resetPasswordImplementation()),
})

const createCustomerImplementation = () => {
    const customerRepository = new CustomerRepository()

    const dbCreateCustomer = new DbCreateCustomer({
        customerRepository,
    })
    return new CreateCustomerImplementation({
        dbCreateCustomer,
    })
}

const findCustomerImplementation = () => {
    const customerRepository = new CustomerRepository()

    const dbFindCustomer = new DbFindCustomer({
        customerRepository,
    })
    return new FindCustomerImplementation({
        dbFindCustomer,
    })
}

const findAllCustomerImplementation = () => {
    const customerRepository = new CustomerRepository()

    const dbFindAllCustomer = new DbFindAllCustomer({
        customerRepository,
    })
    return new FindAllCustomerImplementation({
        dbFindAllCustomer,
    })
}

server.addService(proto[1].service.customerService, {
    create: adapter(createCustomerImplementation()),
    find: adapter(findCustomerImplementation()),
    findAll: adapter(findAllCustomerImplementation()),
})

const createOrderServiceImplementation = () => {
    const customerRepository = new CustomerRepository()
    const userRepository = new UserRepository()
    const orderServiceRepository = new OrderServiceRepository()

    const dbCreateOrderService = new DbCreateOrderService({
        customerRepository,
        orderServiceRepository,
        userRepository,
    })
    return new CreateOrderServiceImplementation({
        dbCreateOrderService,
    })
}

const findByCustomerOrderServiceImplementation = () => {
    const orderServiceRepository = new OrderServiceRepository()

    const dbFindByCustomer = new DbFindByCustomer({
        orderServiceRepository,
    })
    return new FindByCustomerOrderServiceImplementation({
        dbFindByCustomer,
    })
}

const findByUserOrderServiceImplementation = () => {
    const orderServiceRepository = new OrderServiceRepository()

    const dbFindByUser = new DbFindByUser({
        orderServiceRepository,
    })
    return new FindByUserOrderServiceImplementation({
        dbFindByUser,
    })
}

server.addService(proto[2].service.orderServiceService, {
    create: adapter(createOrderServiceImplementation()),
    findByCustomer: adapter(findByCustomerOrderServiceImplementation()),
    findByUser: adapter(findByUserOrderServiceImplementation()),
})

server.bind(
    `0.0.0.0:${process.env.PORT}`,
    grpc.ServerCredentials.createInsecure()
)
server.start()
console.info(`(BACK-END-SERVICE) RUN ON PORT = ${process.env.PORT}`)
