const { expect, test } = require('@jest/globals')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../../src/index')
const { gatewayModel: Gateway, deviceModel: Device } = require('../../src/models')

const api = supertest(app)

const inicialGateway = [
  {
    serialNumber: '23423423423',
    name: 'Gateway 1',
    ipAddress: '192.168.0.2'
  },
  {
    serialNumber: '23423423424',
    name: 'Gateway 2',
    ipAddress: '192.168.0.3'
  }
]

const inicialDevice = () => {
  const device = []
  for (let index = 0; index < 10; index++) {
    device.push({
      vendor: `Vendor ${index}`,
      dateCreate: '2022-12-20',
      status: true
    })
  }
  return device
}

beforeEach(async () => {
  await Gateway.deleteMany({})
  await Device.deleteMany({})

  for (const item of inicialGateway) {
    const gateway = new Gateway(item)
    await gateway.save()
  }
})

describe('Adding gateway', () => {
  test('adding a new gateway', async () => {
    const newGateway = {
      serialNumber: '23423434234',
      name: 'Gateway 1',
      ipAddress: '192.168.0.2'
    }

    await api.post('/api/gateway')
      .send(newGateway).expect(200).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/gateway')
    const serialNumbers = response.body.data.map(gateway => gateway.serialNumber)

    expect(response.body.data).toHaveLength(inicialGateway.length + 1)
    expect(serialNumbers).toContain(newGateway.serialNumber)
  })

  test('ip address v4. it is invalid', async () => {
    const newGateway = {
      serialNumber: '23423434234',
      name: 'Gateway 5',
      ipAddress: '234.34.787.988'
    }

    const res = await api.post('/api/gateway')
      .send(newGateway).expect(403)

    const response = await api.get('/api/gateway')
    expect(response.body.data).toHaveLength(inicialGateway.length)
    const msgErrors = res.body.errors.map(error => error.msg)
    expect(msgErrors).toContain('it is invalid')
  })
  test('ip address v4 it is valid', async () => {
    const newGateway = {
      serialNumber: '23423434234',
      name: 'Gateway 5',
      ipAddress: '10.10.10.10'
    }

    await api.post('/api/gateway')
      .send(newGateway).expect(200)

    const response = await api.get('/api/gateway')
    expect(response.body.data).toHaveLength(inicialGateway.length + 1)
  })
})

describe('Periherical Device', () => {
  test('Device are returned as json', async () => {
    await api
      .get('/api/device')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('Add device', async () => {
    const response = await api.get('/api/gateway')
    const id = response.body.data[0]._id
    const newDevice = {
      vendor: 'Vendor 11',
      dateCreate: '2022-12-20',
      status: true
    }
    // console.log(newDevice)
    await api.post(`/api/device/gateway/${id}`)
      .send(newDevice).expect(200)
  })
  test('Solo permita 10 dispositivos perifericos', async () => {
    const response = await api.get('/api/gateway')
    const id = response.body.data[0]._id
    for (const iterator of inicialDevice()) {
      const newDevice = {
        ...iterator
      }
      await api.post(`/api/device/gateway/${id}`)
        .send(newDevice)
    }
    const otherDevice = {
      vendor: 'Vendor 11',
      dateCreate: '2022-12-20',
      status: true
    }
    const res = await api.post(`/api/device/gateway/${id}`)
      .send(otherDevice).expect(403)
    expect(res.body.error).toContain('Sorry, The gateway has 10 peripheral devices.')
  })

  test('Delete device', async () => {
    const response = await api.get('/api/gateway')
    const id = response.body.data[0]._id
    const newDevice = {
      vendor: 'Vendor 11',
      dateCreate: '2022-12-20',
      status: true
    }
    // console.log(newDevice)
    const res = await api.post(`/api/device/gateway/${id}`)
      .send(newDevice).expect(200)

    const idDevice = res.body.data._id
    await api.delete(`/api/device/${idDevice}`).expect(200)
    const devices = await api.get('/api/device')
    console.log(devices.body.data)
  })
})

describe('Operation', () => {
  test('Gateways are returned as json', async () => {
    await api
      .get('/api/operation/gateways')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two gateways', async () => {
    const response = await api.get('/api/operation/gateways')
    expect(response.body.data).toHaveLength(inicialGateway.length)
  })

  test('return un detalle', async () => {
    const response = await api.get('/api/gateway')
    const id = response.body.data[0]._id
    await api.get(`/api/operation/gateway/${id}`).expect(200)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
