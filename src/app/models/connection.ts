/**
 * The `Connection` class represents a connection to a database.
 * It stores the necessary information to establish the connection, including details
 * about the user, host, database, password, and port.
 */

export class Connection {
  public user: string;
  public host: string;
  public database: string;
  public password: string;
  public port: string;

  /**
   * Creates an instance of the `Connection` class.
   * @param use - The username for the database connection.
   * @param hos - The host of the database server.
   * @param dat - The name of the database to connect to.
   * @param pas - The password for the specified user.
   * @param por - The port for connecting to the database server.
   */

  constructor(use: string, hos: string, dat: string, pas: string, por: string) {
    this.user = use;
    this.host = hos;
    this.database = dat;
    this.password = pas;
    this.port = por;
  }
}
