export default class Computation {
  isPaymentSettled(user) {
    let unsettled = _.get(this, `change.users[${user}]`, 0);
    return !(Math.round(unsettled * 100));
  }

  getUnsettledCount() {
    return _(this.change.users).values()
      .filter(val => Math.round(val * 100))
      .value().length;
  }
}