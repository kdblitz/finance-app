export default class BaseRow {
    constructor(state) {
        this.expenseState = state;
    }

    getState() {
        return this.expenseState.state;
    }
}