/**
 * Meteor code for Home.
 *
 * @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
 */



//----------------- Subscriptions

// Transactions, filtered by user server-side
Meteor.subscribe("transactions");






//----------------- Helpers

Template.Home.helpers({
    transactions: function () {
        // Show newest transactions at the top
        return Transactions.find({}, {sort: {date: -1}});
    }
});







//----------------- Events

Template.Home.events({
    "submit .submit-transaction": function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get values from form element
        var description = event.target.description.value;
        var date        = event.target.date.value;
        var category    = event.target.category.value;
        var amount      = event.target.amount.value;

        // Insert this transaction into the collection
        Meteor.call("addTransaction", description, date, category, amount);

        // Clear form
        event.target.description.value  = "";
        event.target.date.value         = "";
        event.target.category.value     = "";
        event.target.amount.value       = "";
    }
});