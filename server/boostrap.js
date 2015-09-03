/**
 * Bootstrap code for this application.
 *
 * @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
 */

// Startup *server-side* stuffs here.
Meteor.startup(function (){

    if (Transactions.find().count() === 0) {
        console.log("No transactions found at startup!");
    }

});