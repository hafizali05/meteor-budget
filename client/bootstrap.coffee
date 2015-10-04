
##
# Bootstrap code for this application.
# Client side.
#
# @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
#######################################################################



#################### Startup stuffs here.

Meteor.startup ->
    # Is login dropdown list opened? (pretty self-explanatory)
    isLoginDropdownOpened = false

    # Interval ID - login dropdown list timeout.
    loginButtonIntervalID = null
