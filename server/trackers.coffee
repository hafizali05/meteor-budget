
##
# Trackers methods.
# Stuffs like "if happens this - and you notice it - then do that".
#
# @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
#######################################################################




######################## Accounts tracking methods

Accounts.onCreateUser (options, user) ->

  balance = {
    starting:   0.0,
    value:      0.0,
    currency:   '€'
  }

  user.balance = balance

  # Also start with some categories....
  _categories = [
    {
      name: "Bills",
      owner: user._id
    },
    {
      name: "Payments",
      owner: user._id
    }
  ]

  _categories.forEach(category) ->
    Categories.insert(category)

  # ... and some transactions ;)
  _transactions = [
    {
      description: "Sample Income Transaction",
      date: new Date(),
      category: "Payments",
      amount: 1500,
      type: "Income",
      owner: user._id
    },
    {
      description: "Sample Outcome Transaction",
      date: new Date(),
      category: "Bills",
      amount: 31,
      type: "Outcome",
      owner: user._id
    }
  ]

  _transactions.forEach (transaction) ->
    Transactions.insert(transaction)


  # Finally, touch the balance:
  user.balance.value = 1469

  # return
  user;
