/**
 * Methods and other server side stuffs.
 *
 * @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
 */



//----------------- Methods

Meteor.methods({


    // ------ Collection: Transactions
    addTransaction: function (description, date, category, type, amount) {

        // Make sure the user is logged in before inserting a transaction
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var dateArr         = date.split("-");
        var formattedDate   = new Date(dateArr[0], (parseInt(dateArr[1])-1), dateArr[2]);

        // If we received a string, try to convert it into a number
        if (typeof amount === "string") {
            amount = parseFloat(amount);
        }

        // A last check: if fails, throw an error!
        if (amount === undefined || amount === null || typeof amount !== "number") {
            throw new Meteor.Error("invalid amount: "+amount);
        }

        // Insert transaction into collection
        Transactions.insert({
            description: description,
            date: formattedDate,
            category: category,
            amount: amount,
            type: type,
            owner: Meteor.userId()
        });

    },


    // ------ Collection: Transactions
    deleteTransaction: function (id, type, amount) {

        // Make sure the user is logged in before doing anything
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        // Get transaction values before removing it

        Transactions.remove({
            _id: id
        });

        Meteor.call("touchBalance", (type === 'Income' ? 'Outcome' : 'Income'), amount);

    },


    // ------ Collection: Meteor.users
    touchBalance: function (type, amount) {

        // Make sure the user is logged in before doing anything
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        // If we received a string, try to convert it into a number
        if (typeof amount === "string") {
            amount = parseFloat(amount);
        }

        // A last check: if fails, throw an error!
        if (amount === undefined || amount === null || typeof amount !== "number") {
            throw new Meteor.Error("invalid amount: "+amount);
        }

        // Get the balance JSON
        var balance = Meteor.users.findOne(this.userId).balance;

        if (type === 'Income') {
            balance.value += amount;
        } else {
            balance.value -= amount;
        }

        // Update user balance
        Meteor.users.update( this.userId, { $set: {balance : balance} } );

    },


    // ------ Collection: Categories
    addCategory: function (name) {

        // Make sure the user is logged in before inserting a category
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var cat = {
            name: name,
            owner: Meteor.userId()
        };

        if (Categories.find(cat).count() > 0) {

            throw new Meteor.Error("Category already exists!");

        }

        Categories.insert(cat);

    },


    // ------ Collection: Categories
    deleteCategory: function (id) {

        // Make sure the user is logged in before doing anything
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Categories.remove({
            _id: id
        });

    }

});

