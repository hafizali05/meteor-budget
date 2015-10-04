
 ##
 # Routing goes here.
 #
 # @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
 #######################################################################


Router.configure({
  # that's the default layout
  layoutTemplate: 'Main'
})


Router.route '/', ->
  if Meteor.user()
    this.redirect '/Transactions'
  else
    this.render 'Home'


Router.route '/Transactions', ->
  if Meteor.user()
    this.render 'Transactions'
  else
    this.redirect '/'


Router.route '/Categories', ->
  if Meteor.user()
    this.render 'Categories'
  else
    this.redirect '/'
