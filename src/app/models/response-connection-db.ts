/**
 * The `ResponseConnectionDb` class represents the response of a connection to the database.
 * It stores a connection token that can be used to perform database operations
 * in an active session.
 */
export class ResponseConnectionDb {
  public tokenConnection: string;

  /**
   * Creates an instance of the `ResponseConnectionDb` class.
   * @param tok - The connection token to the database.
   */

  constructor(tok: string) {
    this.tokenConnection = tok;
  }
}
