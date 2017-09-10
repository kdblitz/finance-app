export default class Item {
    constructor({name, quantity, price, claimedQuantity, shared}) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.claimedQuantity = claimedQuantity;
        this.shared = shared;
    }

    computeShare(share = 1, userCount = this.claimedQuantity) {
        if (this.shared) {
            return this.claimedQuantity ? 
                share * this.computeTotal() / this.claimedQuantity :
                this.computeTotal() / userCount;
        } else {
            return share * this.price;
        }
    }

    computeTotal() {
        return this.price * this.quantity;
    }
}