/**
 * The `MyConnectionDb` class represents a basic connection to a database.
 * It stores the name of the database you want to connect to.
 */

export class MyConnectionDb {
  public database: string;

  /**
   * Creates an instance of the `MyConnectionDb` class.
   * @param dat - The name of the database you are connecting to.
   */

  constructor(dat: string) {
    this.database = dat;
  }
}
