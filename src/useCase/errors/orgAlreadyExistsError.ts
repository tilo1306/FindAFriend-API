export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Name Organization already exists.')
  }
}
