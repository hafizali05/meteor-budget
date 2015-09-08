/**
 * Meteor code for Home.
 *
 * @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
 */



//----------------- Subscriptions

// Categories, filtered by user server-side
Meteor.subscribe("categories");





//----------------- Helpers

Template.Categories.helpers({

    categories: function () {
        // Show categories sorted alphabetically
        return Categories.find({}, {sort: {name: 1}});
    }

});





//----------------- Events

Template.Categories.events({

    "submit .insert-category": function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get values from form element
        var name = event.target.name.value;

        // Insert this category into the collection
        Meteor.call("addCategory", name, function (error, results) {
            if (error) {
                console.log("This category already exists!");
                // DO SOMETHING TO ALERT THE USER HERE
            }
        });

        // Clear form
        event.target.name.value = "";
    },

    "click .delete": function (event) {
        // Popup a confirmation dialog if there are transactions using this category!
        Meteor.call("deleteCategory", this._id);
    }

});
