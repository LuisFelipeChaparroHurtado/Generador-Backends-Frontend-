/**
 * The `User` class represents a user in the system.
 * It stores information related to the user, such as the user ID, full name, email,
 * password, creation date, profile photo name, and user profile.
 */
export class User {
  public id_user: string;
  public full_name: string;
  public email_user: string;
  public password_user: string;
  public date_user: string;
  public name_photo: string;
  public base64_photo: string;
  public profile: string;

  /**
   * Creates an instance of the `User` class.
   * @param id - The unique identifier of the user.
   * @param nam - The user's full name.
   * @param em - The user's email.
   * @param pass - The user's password.
   * @param date - The creation date of the user's account.
   * @param namPhoto - The file name of the user's profile photo.
   * @param basePhoto - The user's profile photo encoded in base64.
   * @param idPro - The user's profile.
   */

  constructor(
    id: string,
    nam: string,
    em: string,
    pass: string,
    date: string,
    namPhoto: string,
    basePhoto: string,
    idPro: string
  ) {
    this.id_user = id;
    this.full_name = nam;
    this.email_user = em;
    this.password_user = pass;
    this.date_user = date;
    this.name_photo = namPhoto;
    this.base64_photo = basePhoto;
    this.profile = idPro;
  }
}
