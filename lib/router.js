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
    this.render('Home');
});