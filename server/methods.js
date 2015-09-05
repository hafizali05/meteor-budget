/**
 * Methods and other server side stuffs.
 *
 * @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
 */



//----------------- Methods

Meteor.methods({

    addTransaction: function (description, date, category, amount) {

        // Make sure the user is logged in before inserting a transaction
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Transactions.insert({
            description: description,
            date: date,
            category: category,
            amount: amount,
            owner: Meteor.userId()
        });

    },


    addCategory: function (name) {

        // Make sure the user is logged in before inserting a category
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Categories.insert({
            name: name,
            owner: Meteor.userId()
        });

    }

});

