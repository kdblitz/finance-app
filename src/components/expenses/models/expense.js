export default class Expense {
  constructor({name, items = {}, rows = [], users = {}, creator} = {}) {
    this.name = name || 'Expense form';
    this.items = items;
    this.rows = rows;
    this.users = users;
    this.creator = creator;
  }
}