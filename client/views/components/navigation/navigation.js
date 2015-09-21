/**
 * Navbar component (Bootstrap style, but more lighter and simpler).
 *
 * @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
 */



//----------------- Helpers

Template.Navigation.helpers({
    entries: [
        { entry: "Transactions", link: "/Transactions" },
        { entry: "Categories", link: "/Categories" },
        { entry: "Analysis", link: "/Analysis" },
        { entry: "Settings", link: "/Settings" }
    ]
});





//----------------- Events

Template.Navigation.events({


    // Mouse click "login-buttons" div.
    // ACTIONS: Open / Close login dropdown div.
    "click .login-link-text": function (event) {

        // Prevent "click html" to be executed.
        event.stopPropagation();

        if (isLoginDropdownOpened) {
            $('.login-close-text').click();
        }

        isLoginDropdownOpened = !isLoginDropdownOpened;

    },

    // Mouse leave entire "login-buttons" div.
    // ACTIONS: Start a timeout and fade out that div.
    "mouseleave #login-buttons": function (event) {

        //Template._loginButtons.toggleDropdown();
        if (isLoginDropdownOpened) {
            loginButtonIntervalID = setTimeout("$('.login-close-text').click(); isLoginDropdownOpened=false", 400);
        }

    },

    // Mouse enter the entire "login-buttons" div.
    // ACTIONS: User is thinking about what to click, do not allow DIV closure!
    "mouseover #login-buttons": function (event) {

        if (isLoginDropdownOpened) {
            clearTimeout(loginButtonIntervalID);
        }

    },

});
