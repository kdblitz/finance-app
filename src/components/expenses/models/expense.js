export default class Expense {
  constructor({items = {}, rows = [], users = {}} = {}) {
    this.items = items;
    this.rows = rows;
    this.users = users;
  }
}