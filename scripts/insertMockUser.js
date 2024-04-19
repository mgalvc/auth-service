import '../db.js'
import { User } from '../model.js'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

const email = faker.internet.email()
const password = faker.internet.password()

await new User({
  email,
  password: bcrypt.hashSync(password, 10)
}).save()

console.log(`created user email: ${email}, password: ${password}`)

process.exit(0)