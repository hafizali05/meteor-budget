/**
 * Routing goes here.
 *
 * @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
 */


Router.configure({
    // the default layout
    layoutTemplate: 'Main'
});


Router.route('/', function () {
    if (Meteor.user()) {
        this.redirect('/Transactions');
    } else {
        this.render('Home');
    }
});

Router.route('/Transactions', function () {
    if (Meteor.user()) {
        this.render('Transactions');
    } else {
        this.redirect('/');
    }
});

Router.route('/categories', function () {
    if (Meteor.user()) {
        this.render('Categories');
    } else {
        this.redirect('/');
    }
});