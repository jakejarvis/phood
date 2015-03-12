# COMP 20 Team 5: Phood

## 1. Project title

Phood

## 2. Problem statement

You are in an area and are STARVING and are trying to decide where to eat. You want to go somewhere that’s well-reputed and you want to preview what you should order. If only there was a way to see all the delicious food before you committed to ordering. Alas, Phood, the website/app that shows you the most photographed restaurants and food in your current location.

## 3. How do you solve the problem?

- Get photos that have been geotagged at different restaurants through social media (Instagram, Facebook, Yelp, Twitter) and compile those photos based on the restaurants they came from on the menu item that the photo is of.
- Can send you push notifications for the most photographed restaurant near your current location
- When traveling can send you an email of the top 10 most photographed foods in your new area so you have an idea of places to try out
- Have a live feed that shows photos that are being posted near you so you can see daily specials, etc.
- Can post photos to social media

## 4. List of all the features that your team will implement

- Geolocation
- Server-side data persistence (e.g., with PostgreSQL, MongoDB, MySQL)
- Front-end framework including Bootstrap, React, Backbone.js, AngularJS
- Data or screen scraping
- Send emails, SMSes, or push notifications

## 5. What data will your prototype be using and collecting?

We will be scraping the list of restaurants according to the user’s geolocation from the Yelp API. After we have the restaurant name, we can query the Instagram, Facebook, and Twitter APIs with that location tag to find pictures of food. We can then sort the list of restaurants by distance and popularity, or display the results on a Google Map. Once the user chooses a restaurant, we can give them driving/walking directions to the restaurant from their current location.

## 6. Any algorithms or special techniques that will be necessary

- We need to sort the list of restaurants by both popularity and distance – the most popular restaurants should show up first, but they can’t be too far.
- Of the photos that are geotagged at a location, need to make sure we are selecting the ones only of food 
- Sort photos based on which are posted most recently
- 
#Comments by Ming
1. Hilarious title
2. What you listed in " List of all the features that your team will implement" are not features --features are listed in your " How do you solve the problem?"
3. Ambitious idea: I would scope down a notch
4. Rats, you should have linked the wireframes onto this document
5 Overall score: 13/15
