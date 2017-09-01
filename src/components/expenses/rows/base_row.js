export default class BaseRow {
    constructor(state, label) {
        this.expenseState = state;
        this.label = label;
    }

    getLabel() {
        return this.label;
    }

    getState() {
        return this.expenseState.state;
    }
}