

##
# Meteor code for Transactions page.
#
# @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
#######################################################################



################### Subscriptions

# Categories, filtered by user server-side
Meteor.subscribe("categories")

# Transactions, filtered by user server-side
Meteor.subscribe("transactions")

# Balance
Meteor.subscribe("balance")






################### Helpers


Template.Transactions.helpers({


  balance: () ->

    Meteor.users.findOne( {_id: Meteor.userId()} ).balance

  ,


  # Return current balance
  balanceString: () ->

    balance = Meteor.users.findOne( {_id: Meteor.user()._id} ).balance

    if balance is undefined
      0.0
    else if balance.value < 0
      "-#{balance.currency + Math.abs(parseFloat(balance.value)).toFixed(2)}"
    else
      balance.currency + balance.value.toFixed(2)

  ,


  # Show categories sorted alphabetically
  categories: () ->

    Categories.find({}, { sort: {name: 1} })

  ,


  # Show newest transactions at the top
  transactions: () ->

    Transactions.find({}, { sort: {date: -1} })

  ,

  # Returns a list of transactions grouped by date.
  # Dates include year, month and day. Hours, minutes and seconds avoided.
  transactionsByDate: () ->
    transactions    = Transactions.find({}, { sort: {date: -1} }).fetch()
    groupedDates    = _.groupBy(transactions, (item) ->
      item.date.toString().substring(0, 10)
    )

    groupedByDates = []

    _.each(_.values(groupedDates), (elements) ->

      # thisDate is like this:
      # {
      #   date: "Tue 2015 17",
      #   elements: [array]
      # }
      #
      # elements is like this:
      # [
      #   { date: ..., type: ..., category: ... etc...},
      #   { date: ..., type: ..., category: ... etc...},
      #   .....
      # ]
      # Every element shares the same date.


      thisDate = []

      thisDate.push(element) for element in elements

      groupedByDates.push({
        date: thisDate[0].date,
        elements: thisDate
      })

      ###
        for (var i=0; i<elements.length; i++)
          thisDate.push(elements[i])
      ####
    )

    groupedByDates
})







################### Events

Template.Transactions.events({

  "submit .submit-transaction": (event) ->

    # Prevent default browser form submit
    event.preventDefault()

    # Get values from form element
    description = event.target.description.value
    date        = event.target.date.value
    category    = event.target.category.value
    type        = event.target.type.value
    amount      = event.target.amount.value

    # Insert this transaction into the collection
    Meteor.call("addTransaction", description, date, category, type, amount)

    # Also, modify user balance
    Meteor.call("touchBalance", type, amount)

    # Clear form
    event.target.description.value  = ""
    event.target.date.value         = ""
    event.target.amount.value       = ""

  ,

  "click .delete": (event) ->

    tds = event.target.parentNode.parentNode.children

    tableHTML =
      "<table class=\"u-full-width transactionsHome transactionsDialog\">
        <thead>
        <tr>
        <th>Description</th>
        <th>Date</th>
        <th>Category</th>
        <th>Amount</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        #{tds[0].outerHTML}
        #{tds[1].outerHTML}
        #{tds[2].outerHTML}
        #{tds[3].outerHTML}
        </tr>
        </tbody>
        </table>"

    id      = this._id
    type    = this.type
    amount  = this.amount

    # Popup dialog (powered by alertify)
    alertify.confirm(

      # Popup title
      "Are you sure you want to delete this transaction?",

      # Popup message
      tableHTML,

      # On "YES!" callback
      () ->
          Meteor.call "deleteTransaction", id, type, amount, () ->
              alertify.message('Transaction deleted.')

      ,

      # On "CANCEL" callback
      () ->

    )

    # Options...
    .set('reverseButtons', true)
    .set('transition', 'fade')
    .set('resizable', true)
    .set('defaultFocus', 'ok')
    .set('labels', { ok: 'YES'})
    .resizeTo("600px", "300px")

})
