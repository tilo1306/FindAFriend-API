export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Name Organization already or email exists.')
  }
}
