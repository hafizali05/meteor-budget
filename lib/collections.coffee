
 ##
 # Collections.
 #
 # @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
 #######################################################################


@Transactions    = new Mongo.Collection("transactions")
@Categories      = new Mongo.Collection("categories")
@Balance         = new Mongo.Collection("balance")