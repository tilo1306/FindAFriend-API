export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Organization name or email already exists.')
  }
}
