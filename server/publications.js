/**
 * Server publications.
 *
 * @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
 */


// Publish user transactions
Meteor.publish("transactions", function () {

    // Publish transactions only if user is logged in and only for that user.
    if (this.userId) {
        return Transactions.find({
            owner: this.userId
        });
    }

});


// Publish user transactions categories
Meteor.publish("categories", function () {

    // Publish categories only if user is logged in and only for that user.
    if (this.userId) {
        return Categories.find({
            owner: this.userId
        });
    }

});


// Publish user balance
Meteor.publish("balance", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'startingBalance': 1, 'balance': 1}});
    } else {
        this.ready();
    }
});
