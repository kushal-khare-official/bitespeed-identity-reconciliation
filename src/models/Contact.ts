import { InferAttributes } from 'sequelize'
import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  Default,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'

export enum UserLinkPrecedence {
  Primary,
  Secondary,
}

export type ContactCreationAttributes = { phoneNumber?: string; email?: string }

@Table({
  tableName: 'contacts',
  validate: {
    validatePhoneandEmail(this: Contact) {
      if (this.phoneNumber === null && this.email === null) {
        throw new Error('Contact must have either email or phone number!')
      }
    },
    validateLinkedId(this: Contact) {
      if (
        this.linkedId === null &&
        this.linkPrecedence === UserLinkPrecedence.Secondary
      ) {
        throw new Error('Secondary contacts must have a Linked ID!')
      }
    },
  },
})
export class Contact extends Model<InferAttributes<Contact>> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public declare id: number

  @AllowNull
  @Column
  public declare phoneNumber: string

  @AllowNull
  @Column
  public declare email: string

  @AllowNull
  @ForeignKey(() => Contact)
  @Column
  public declare linkedId: number

  @Default(UserLinkPrecedence.Primary)
  @Column
  public declare linkPrecedence: UserLinkPrecedence

  @CreatedAt
  public createdAt?: Date

  @UpdatedAt
  public updatedAt?: Date

  @DeletedAt
  public deletedAt?: Date
}

export type ConsolidatedContact = {
  primaryContatctId: number
  emails: string[]
  phoneNumbers: string[]
  secondaryContactIds: number[]
}
