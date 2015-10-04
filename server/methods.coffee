
##
# Methods and other server side stuffs.
#
# @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
#######################################################################




#################### Methods

Meteor.methods({

  ####################  Collection: Transactions
  addTransaction: (description, date, category, type, amount) ->

    # Make sure the user is logged in before inserting a transaction
    if not Meteor.userId()
      throw new Meteor.Error("not-authorized")

    dateArr       = date.split("-")
    formattedDate = new Date(dateArr[0], (parseInt(dateArr[1])-1), dateArr[2])

    # If we received a string, try to convert it into a number
    if typeof amount is "string"
      amount = parseFloat(amount)

    # A last check: if fails, throw an error!
    if amount is undefined or amount is null or typeof amount isnt "number"
      throw new Meteor.Error("invalid amount: #{amount}")

    # Insert transaction into collection
    Transactions.insert({
      description: description,
      date: formattedDate,
      category: category,
      amount: amount,
      currency: Meteor.user().balance.currency,
      type: type,
      owner: Meteor.userId()
    });

  ,


  ####################  Collection: Transactions
  deleteTransaction: (id, type, amount) ->

    # Make sure the user is logged in before doing anything
    if not Meteor.userId()
      throw new Meteor.Error("not-authorized")

    # Get transaction values before removing it

    Transactions.remove({
      _id: id
    });

    Meteor.call("touchBalance", (if type is 'Income' then 'Outcome' else 'Income'), amount);

  ,


  #################### Collection: Meteor.users
  touchBalance: (type, amount) ->

    # Make sure the user is logged in before doing anything
    if not Meteor.userId()
      throw new Meteor.Error("not-authorized")

    # If we received a string, try to convert it into a number
    if typeof amount is "string"
      amount = parseFloat(amount)

    # A last check: if fails, throw an error!
    if amount is undefined or amount is null or typeof amount isnt "number"
      throw new Meteor.Error("invalid amount: "+amount)

    # Get the balance JSON
    balance = Meteor.users.findOne(this.userId).balance

    if type is 'Income'
      balance.value += amount
    else
      balance.value -= amount

    # Update user balance
    Meteor.users.update( this.userId, { $set: {balance : balance} } )

  ,


  #################### Collection: Categories
  addCategory: (name) ->

    # Make sure the user is logged in before inserting a category
    if not Meteor.userId()
      throw new Meteor.Error("not-authorized")

    cat = {
      name: name,
      owner: Meteor.userId()
    }

    if Categories.find(cat).count() > 0
      throw new Meteor.Error("Category already exists!")

    Categories.insert(cat)

  ,


  #################### Collection: Categories
  deleteCategory: (id) ->

    # Make sure the user is logged in before doing anything
    if not Meteor.userId()
      throw new Meteor.Error("not-authorized")

    Categories.remove({
      _id: id
    })

})

