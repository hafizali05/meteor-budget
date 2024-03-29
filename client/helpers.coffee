
##
# Application scope level helpers and stuffs.
#
# @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
#######################################################################



#################### Global Template Helpers

Template.registerHelper 'prettifyDate', (date) ->

  weekday     = new Array(7)
  weekday[0]  = "Sunday"
  weekday[1]  = "Monday"
  weekday[2]  = "Tuesday"
  weekday[3]  = "Wednesday"
  weekday[4]  = "Thursday"
  weekday[5]  = "Friday"
  weekday[6]  = "Saturday"

  month       = new Array()
  month[0]    = "January"
  month[1]    = "February"
  month[2]    = "March"
  month[3]    = "April"
  month[4]    = "May"
  month[5]    = "June"
  month[6]    = "July"
  month[7]    = "August"
  month[8]    = "September"
  month[9]    = "October"
  month[10]   = "November"
  month[11]   = "December"

  # Remember: in CoffeeScript last row is always returned!
  weekday[date.getDay()] + ", " + date.getDate() + " " + month[date.getMonth()] + date.getFullYear()



Template.registerHelper 'toLowerCase', (str) ->
  # Remember: in CoffeeScript last row is always returned!
  str.toLowerCase()



Template.registerHelper 'transactionSign', (type) ->
  # Remember: in CoffeeScript last row is always returned!
  if type is 'Outcome' then '-' else ''
