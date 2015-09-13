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
    this.render('Transactions');
});

Router.route('/Transactions', function () {
    this.redirect('/');
});

Router.route('/categories', function () {
    if (Meteor.user()) {
        this.render('Categories');
    } else {
        this.redirect('/');
    }
});