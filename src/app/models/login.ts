/**
 * The `Login` class represents a user's login information.
 * It stores the email and password details necessary to authenticate a user.
 */
export class Login {
  public emailUser: string;
  public passwordUser: string;

  /**
   * Creates an instance of the `Login` class.
   * @param ema - The user's email address.
   * @param pas - The user's password.
   */
  
  constructor(ema: string, pas: string) {
    this.emailUser = ema;
    this.passwordUser = pas;
  }
}
