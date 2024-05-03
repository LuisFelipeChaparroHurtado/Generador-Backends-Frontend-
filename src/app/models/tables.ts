/**
 * The `Tables` class represents the structure of a table in a database.
 * It stores the table's name, the name of a specific column, and its data type.
 */
export class Tables {
  public table_name: string;
  public column_name: string;
  public data_type: string;

  /**
   * Creates an instance of the `Tables` class.
   * @param tab - The name of the table.
   * @param col - The name of a specific column in the table.
   * @param dat - The data type of the specified column.
   */

  constructor(tab: string, col: string, dat: string) {
    this.table_name = tab;
    this.column_name = col;
    this.data_type = dat;
  }
}
