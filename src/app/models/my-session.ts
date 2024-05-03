/**
 * The `MySession` class represents a user session.
 * It stores information about the session, such as the session ID, the user's name,
 * and their profile.
 */
export class MySession {
  public id: string;
  public name: string;
  public profile: string;

  /**
   * The `MySession` class represents a user session.
   * It stores information about the session, such as the session ID, the user's name,
   * and their profile.
   */

  constructor(id: string, nam: string, pro: string) {
    this.id = id;
    this.name = nam;
    this.profile = pro;
  }
}
