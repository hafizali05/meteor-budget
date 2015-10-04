
##
# Server publications.
#
# @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
#######################################################################



# Publish user transactions
Meteor.publish "transactions", () ->

    # Publish transactions only if user is logged in and only for that user.
    if this.userId then Transactions.find({ owner: this.userId })



# Publish user transactions categories
Meteor.publish "categories", () ->

    # Publish categories only if user is logged in and only for that user.
    if this.userId then Categories.find({ owner: this.userId })



# Publish user balance
Meteor.publish "balance", () ->

  if this.userId
      Meteor.users.find({_id: this.userId}, {fields: {'startingBalance': 1, 'balance': 1}})
  else
    this.ready()


