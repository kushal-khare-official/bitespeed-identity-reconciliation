import { Sequelize } from 'sequelize-typescript'
import { Contact } from './models/Contact'

const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost:5432/bitespeed',
)

sequelize.addModels([Contact])
