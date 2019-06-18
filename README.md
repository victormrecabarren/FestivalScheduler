# Heroku link to festival scheduler

https://festivalscheduler.herokuapp.com/CampFlogGnaw/Saturday/Lineup



# Problem:
"I'm going to a festival and there are several stages, artists, and set times and can't figure out how to set up my schedule to make sure I don't miss acts I really want to see!"

# General App Idea:
A display of the full itinerary for the festival that makes intuitive which acts happen simultaneously, and allows the user to select acts to fill up a personal non-conflicting schedule. The app will include show pages for each act, as well as a "live" tab that, when open, will let user see where they are located on the map of the festival as well as which acts are live at the time.

# Who Would Use It:
Festival goers!

Wireframe 1:
![](https://github.com/victormrecabarren/FestivalScheduler/blob/master/materials/IMG_4842.jpeg?raw=true "Logo Title Text 1")

Wireframe 2:
![](https://github.com/victormrecabarren/FestivalScheduler/blob/master/msr9816qSAiyZVOcDn3%25MA.jpg?raw=true "Logo Title Text 1")



Screenshot 1:
![](https://github.com/victormrecabarren/FestivalScheduler/blob/master/materials/Screen%20Shot%202019-06-08%20at%204.42.07%20PM.png?raw=true "Logo Title Text 1")

Screenshot 2:
![](https://github.com/victormrecabarren/FestivalScheduler/blob/master/materials/Screen%20Shot%202019-06-08%20at%204.42.28%20PM.png?raw=true "Logo Title Text 1")

Screenshot 3:
![](https://github.com/victormrecabarren/FestivalScheduler/blob/master/materials/Screen%20Shot%202019-06-08%20at%204.44.26%20PM.png?raw=true "Logo Title Text 1")




## I used:
- Node.js
- Mongoose
- Express
- EJS
- bcrypt

## In order to create an MVC file structure with:
  - Collection of all  Artists as well as a collection of a users (Models)
  - Index page for full festival schedule, an index page for a personal itinerary schedule, show pages for each act, and sessions pages (Views)
  - Handle get, put, delete routes using express (Controller)

## A RESTful app, with full CRUD, which:
  - GET for displaying all acts **(Index)**

  - GET to show a form to add new act to the lineup (for admin only) **(New)**

  - POST to add new act to lineup (admin use only) **(Create)**

  - GET to show each artist/act page **(Show)**

  - GET to show page to edit festival main lineup or times (admin use only) **(Edit)**

  - PUT to add new information such as pictures or comments to personal schedule item **(Update)**

  - DELETE to remove items from personal schedule if unwanted **(Destroy)**

  # Extras!
   - Will use EJS partials
   - Will use Bootstrap
   - Go to /CampFlogGnaw/Admin to access edit and create features to make an itinerary using your own lineup!
