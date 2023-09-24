import { Contact } from '@src/models/Contact'
// import { RouteError } from '@src/other/classes'
// import HttpStatusCodes from '@src/constants/HttpStatusCodes'

async function identify(contact: Contact): Promise<Contact> {
  // const persists = await UserRepo.persists(id);
  // if (!persists) {
  //   throw new RouteError(
  //     HttpStatusCodes.NOT_FOUND,
  //     USER_NOT_FOUND_ERR,
  //   );
  // }
  // TODO: Write identify service
  // return { contact }
  try {
    contact = await contact.save()
  } catch(err) {
    console.log(err)
  }

  return contact
}

export default { identify } as const
