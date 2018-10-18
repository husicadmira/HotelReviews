import expect from 'expect';
import request from 'supertest';

import { app } from '../../../index';
import { populateDB, users } from '../../seed/seed';
import { User } from '../../../db/sequelize'
const JWT_SECRET = process.env.JWT_SECRET

beforeEach(populateDB)
describe('POST /users', () => {

    it('should create a user', (done) => {
        const exampleUser = {
            name: 'ExampleName',
            password: 'pass',
            email: 'example@example.com'
        }

        request(app)
            .post('/users')
            .send(exampleUser)
            .expect(200)
            .expect((res) => {
                expect(res.body.id).toExist
                expect(res.body.name).toBe(exampleUser.name)
                expect(res.body.email).toBe(exampleUser.email)
            })
            .end((err) => {
                if (err) {
                    done(err)
                }
                User.findOne({ where: { email: exampleUser.email } }).then((user) => {
                    expect(user.name).toBe(exampleUser.name)
                    done()
                }).catch((error) => {
                    done(error)
                })
            })
    })

    it('should return validation errors if request is invalid', (done) => {
        const exampleUser = {
            name: 'ExampleName',
            password: '123',
            email: 'example'
        }
        request(app)
            .post('/users')
            .send(exampleUser)
            .expect(400)
            .end(done)
    })
})
describe('POST /users/login', () => {

    it('should return authentication token for existing user', (done) => {
        request(app)
            .post('/users/login')
            .send({
                username: users[0].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist
                expect(res.body.id).toExist
                expect(res.body.name).toBe(users[0].name)
                expect(res.body.email).toBe(users[0].email)
            })
            .end(done());
    })
})
