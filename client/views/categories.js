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

        var category        = event.target.parentNode.parentNode.children[0].innerText;
        var categoryHTML    = "<h2 class=\"deleteCategory\">"+category+"</h2>";
        var id              = this._id;

        // Popup dialog (powered by alertify)
        alertify.confirm(

            // Popup title
            "Are you sure you want to delete this category?",

            // Popup message
            categoryHTML,

            // On "YES!" callback
            function(){
                Meteor.call("deleteCategory", id, function () {
                    alertify.message(category+' deleted.');
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
        .resizeTo("350px", "250px");

    }

});
