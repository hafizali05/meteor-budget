/**
 * Server publications.
 *
 * @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
 */

Meteor.publish("transactions", function () {

    // Publish transactions only if user is logged in and only for that user.
    if (this.userId) {
        return Transactions.find({
            owner: this.userId
        });
    }

});

Meteor.publish("categories", function () {

    // Publish categories only if user is logged in and only for that user.
    if (this.userId) {
        return Categories.find({
            owner: this.userId
        });
    }

});