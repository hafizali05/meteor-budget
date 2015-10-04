
##
# Meteor code for the Categories page.
#
# @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
#######################################################################



#################### Subscriptions

# Categories, filtered by user server-side
Meteor.subscribe("categories")





#################### Helpers

Template.Categories.helpers(

  categories: ->
    # Show categories sorted alphabetically
    Categories.find({}, {sort: {name: 1}})

)





#################### Events

Template.Categories.events(

  "submit .insert-category": ->

    # Prevent default browser form submit
    event.preventDefault()

    # Get values from form element
    name = event.target.name.value

    # Insert this category into the collection
    Meteor.call "addCategory", name, (error, results) ->
      if error
        console.log("This category already exists!")
        # DO SOMETHING TO ALERT THE USER HERE

    # Clear form
    event.target.name.value = ""
  ,

  "click .delete": (event) ->

    category        = event.target.parentNode.parentNode.children[0].innerText
    categoryHTML    = "<h2 class=\"deleteCategory\">#{category}</h2>"
    id              = this._id

    # Popup dialog (powered by alertify)
    alertify.confirm(

      # Popup title
      "Are you sure you want to delete this category?",

      # Popup message
      categoryHTML,

      # On "YES!" callback
      () ->
        Meteor.call "deleteCategory", id, () ->
          alertify.message(category+' deleted.')
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
    .resizeTo("350px", "250px")

)
