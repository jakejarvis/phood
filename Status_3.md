# Phood: Status Report 3

1. What was accomplished during the week?

    - We got familiar with Bootstrap and started turning our markups into HTML and CSS. (Thankfully it appears we can use it to make one responsive site for both desktop and mobile, instead of two separate versions.)
    - We began looking into implementing the Foursquare API and set up a foursquare account (more below).
    - We designed a logo and decided on icons to use for pinpoins on the map (bunny and carrots!)
    - We purchased http://phood.at!
    - We set up a twilio account to send users text message alerts and we decided that we will have the option for a user to get the menu for a restaurant sent to their phone

2. Challenges and issues team faced during the week

    - We learned that we additionally need to implement the Foursquare API – plugging coordinates into Instagram wasn't giving us the restaurant photos we expected.
    - We can give foursquare the user's coordinates and get a list of venue id's for restaurants near the user, then give these venue id's to instagram to find photos taken there
    - We also assessed using the Facebook API since that is also compatible with the Instagram API but after investigating the methods, determined the fousquare API fit our needs better.
    - We realized we may no longer need the Yelp API


3. Your goals for the next week

	- Work on the data persistence, have the user be able to store what restaurants they want to remember
	- Look into being able to change the map so that you can find restaurant photos near a location that is not where you currently are
	- Implement the text message alerts
	- Integrate the Foursquare API into the Instagram API
