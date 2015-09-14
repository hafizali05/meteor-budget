/**
 * Navbar component (Bootstrap style, but more lighter and simpler).
 *
 * @author Daniele Gazzelloni <daniele@danielegazzelloni.com>
 */


Template.Navigation.helpers({
    entries: [
        { entry: "Transactions", link: "/Transactions" },
        { entry: "Categories", link: "/Categories" }
    ]
});