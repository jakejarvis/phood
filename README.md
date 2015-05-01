# COMP 20 Team 5: Phood

## 1. Project title

Phood

## 2. Problem statement

You are in an area, STARVING, and are trying to decide where to eat. You want to go somewhere that’s well-reputed and you want to preview what you should order. If only there was a way to see all the delicious food before you committed to ordering. Alas, Phood, the website/app that shows you the instagram photos taken at the restaurants near your current location.

## 3. How do you solve the problem?

- Get photos that have been geotagged at different restaurants through social media (Instagram, Facebook, Yelp, Twitter) and compile those photos based on the restaurants they came from on the menu item that the photo is of.
- Can send you push notifications for the most photographed restaurant near your current location
- When traveling can send you an email of the top 10 most photographed foods in your new area so you have an idea of places to try out
- Have a live feed that shows photos that are being posted near you so you can see daily specials, etc.
- Can post photos to social media

UPDATE:
- Use Foursquare to show the restaurants near one's location
- Get the photos from Instagram that have been geotagged at the restaurant
- The user can look at the photos from different restaurants to determine where they want to go
- They can add the restaurants they're interested in to their list of favorites to remember for later
- Once they decide on a restaurant, they can get a text message with the restaurant's name and address 

## 4. List of all the features that your team will implement

- Geolocation
- Client-side data persistence with either local storage or web SQL
- Front-end framework including Bootstrap, React, Backbone.js, AngularJS
- Data or screen scraping
- Send emails, SMSes, or push notifications

UPDATE:
- Can see all the restaurants near your current location
- Can mouse over the carrots to see the restaurant name
- Clicking on the restaurant's name shows the instagram photos from restaurants near your current location
- Can add the restaurants one's interested in to the list of Carrots to remember and view later by clicking on the star by the restaurant's name
- When adding restaurants to the Carrots list, the star by the restaurant's name changes yellow and if the restaurant page is revisited at a later time, a yellow star indicates the restaurant is already in the Carrots list.
- Can remove a restaurant from the Carrots list by clicking the star by the restaurant's name (the star will then have a white filling)
- Clicking on the star by the PHOOD title brings you to your Carrots page
- When viewing the restaurants in the Carrot list can click on the restaurant's name to view the instagram photos again
- Can clear the list of "Carrots"
- Can view the photos by clicking through them one-by-one or viewing them as a grid
- Can receive a text message with the restaurant's name and address for help in navigating to a restaurant on-the-go
- On the page with the restaurant's photos can go to the restaurant's web page (by clicking on the restaurant name) and can click on the address to see that location by itself on Google Maps
- Clicking on the header brings you back to the homepage

## 5. What data will your prototype be using and collecting?

We will be scraping the list of restaurants according to the user’s geolocation from the Yelp API. After we have the restaurant name, we can query the Instagram, Facebook, and Twitter APIs with that location tag to find pictures of food. We can then sort the list of restaurants by distance and popularity, or display the results on a Google Map. Once the user chooses a restaurant, we can give them driving/walking directions to the restaurant from their current location.

UPDATE:
We scraped the list of restaurants according to the user’s geolocation from the Foursquare API. Using this information we queried the Instagram API to get the photos taken at that location. We also get the restaurant's name and address from the Foursquare API which is displayed on the site. We get the user's phone number when they enter it to receive a text message with the address of the restaurant but do not store it. We collect the names of the restaurants the user has "starred" and show this list on the Carrots page


## 6. Any algorithms or special techniques that will be necessary

- We need to sort the list of restaurants by both popularity and distance – the most popular restaurants should show up first, but they can’t be too far.
- Of the photos that are geotagged at a location, need to make sure we are selecting the ones only of food 
- Sort photos based on which are posted most recently

UPDATE:
- In order to get the Instagram photos that are geotagged at a restaurant we had to first use the Foursquare API to generate a list of restaurants and their corresponding Foursquare ids and then use the Instagram API to convert the Foursquare ids to Instagram ids which were thus used to find the photos taken at a restaurant. This was necessary because just giving Instagram the lat and lng coordinates of a restaurant returned all photos taken near that location and yielded nearly no food photos. The Instagram API takes a Foursquare id as a parameter when trying to query for a specific named location.
- Having the color of the star by the restaurant's name indicate whether that restaurant is in the Carrots list or not even after closing the page and revisiting it later (a yellow star indicates it is, a white star means it is not)


#Comments by Ming
1. Hilarious title
2. What you listed in " List of all the features that your team will implement" are not features --features are listed in your " How do you solve the problem?"
3. Ambitious idea: I would scope down a notch
4. Rats, you should have linked the wireframes onto this document
5. Overall score: 13/15
