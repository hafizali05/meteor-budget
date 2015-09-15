/**
 * Meteor code for Transactions.
 *
 * @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
 */



//----------------- Subscriptions

// Categories, filtered by user server-side
Meteor.subscribe("categories");

// Transactions, filtered by user server-side
Meteor.subscribe("transactions");

// Balance
Meteor.subscribe("balance");






//----------------- Helpers

Template.Transactions.helpers({

    balance: function () {
        return Meteor.users.findOne( {_id: Meteor.userId()} ).balance;
    },

    transactions: function () {
        // Show newest transactions at the top
        return Transactions.find({}, { sort: {date: -1} });
    },

    categories: function () {
        // Show categories sorted alphabetically
        return Categories.find({}, { sort: {name: 1} });
    },

    balanceString: function() {
        // Return current balance
        var balance     = Meteor.users.findOne( {_id: Meteor.user()._id} ).balance;

        if (balance && balance.value < 0) {
            return "-" + balance.currency + Math.abs(parseFloat(balance.value)).toFixed(2);
        } else {
            return balance.currency + balance.value.toFixed(2);
        }
    }

});







//----------------- Events

Template.Transactions.events({

    "submit .submit-transaction": function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get values from form element
        var description = event.target.description.value;
        var date        = event.target.date.value;
        var category    = event.target.category.value;
        var type        = event.target.type.value;
        var amount      = event.target.amount.value;

        // Insert this transaction into the collection
        Meteor.call("addTransaction", description, date, category, type, amount);

        // Also, modify user balance
        Meteor.call("touchBalance", type, amount);

        // Clear form
        event.target.description.value  = "";
        event.target.date.value         = "";
        event.target.amount.value       = "";
    },

    "click .delete": function (event) {
        var tds = event.target.parentNode.parentNode.children;

        var tableHTML = "<table class=\"u-full-width transactionsHome transactionsDialog\">"
            + "<thead>"
            + "<tr>"
            + "<th>Description</th>"
            + "<th>Date</th>"
            + "<th>Category</th>"
            + "<th>Amount</th>"
            + "</tr>"
            + "</thead>"
            + "<tbody>"
            + "<tr>"
            + tds[0].outerHTML
            + tds[1].outerHTML
            + tds[2].outerHTML
            + tds[3].outerHTML
            + "</tr>"
            + "</tbody>"
            + "</table>";

        var id = this._id;
        var type = this.type;
        var amount = this.amount;

        // Popup dialog (powered by alertify)
        alertify.confirm(

            // Popup title
            "Are you sure you want to delete this transaction?",

            // Popup message
            tableHTML,

            // On "YES!" callback
            function(){
                Meteor.call("deleteTransaction", id, type, amount, function () {
                    alertify.message('Transaction deleted.');
                });
            },

            // On "CANCEL" callback
            function(){
            }

        )
        // Options...
        .set('reverseButtons', true)
        .set('transition', 'fade')
        .set('resizable', true)
        .set('defaultFocus', 'ok')
        .set('labels', { ok: 'YES'})
        .resizeTo("600px", "300px");

    }
});
