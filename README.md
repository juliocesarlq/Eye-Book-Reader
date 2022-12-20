# WebEye - Eye controlled e-book reader web application 👁📖💻

## Table of Contents
1. [Overview](#Overview)
1. [Goals and Motivations](#Goals-and-Motivations)
1. [Product Spec](#Product-Spec)
1. [Wireframes](#Wireframes)
2. [Schema](#Schema)
1. [Demo](#Video-Walkthrough)

## Overview
The Eye-Book-Reader is a web application that uses an eye tracking API to enhance user interaction. The primary interaction being the support for an flipping through the book’s pages that follows the user eyes as they look to the left or to the right. The eye tracking API used was WebGazer.js as it was easiest to use for development of the application. WebGazer.js works by training a prediction model and webcam feed to track the location on the screen the user is looking. The model is trained by assuming that when a user clicks they are also looking at that location, this can be used to initiate the model and to help correct the model during use of the application. This model is saved between sessions so initiation has to only be done once. This application will thus be able to allow the reading of eBooks without hands on interaction. Applications of the EyeBook Reader could include the reading of a cooking book while cooking and maybe even allow people that are limited or unable to use input devices such as mouse and keyboard to also be able to access eBooks.

## Goals and Motivations
We were tasked with building an ebook reader web application that is hooked up to a eye tracking system as part of the user interface, the EyeBook Reader. The eye tracking system was utilized to perform tasks such as book selection and navigating the book pages. This is intended to be an easier method for the user to use than having to actively navigate the page with the mouse, as the page will move down when the user looks down and vice versa. So as the user is reading the EyeBook Reader will scroll along to allow the user to continue reading without having additional input, thus facilitating a smoother reading experience.

### 1. User Stories (Required and Optional)

**Required Must-have Stories**

* [x] User logs in to access account settings and view friends
* [x] User accesses a map that can focus and expand with details becoming more explicit as the map focuses
* [x] User can place and delete a marker on any location on the map
* [x] Markers have an extra option for adding text and images which can be used for details about the location or what is going on at that location
* [x] User can log in and log out
* [x] User can upload photos

**Optional Nice-to-have Stories**

* [x] Map visually displays popularity/activity hotspots
* [ ] Videos can be applied to markers
* [ ] Users can rate hotspots/activities

### 2. Screen Archetypes

* Login
* Register
   * Upon download or opening of the app, the user is prompted to login to access the app's features
* Map Screen
   * After logging in or registering, user views the map of their local area. Users can view invites and markers, both private and public.
* Profile Screen
   * Users can open their profile and view their settings and preferences.
* Events Screen
   * Users can view private and public events in the area specified on the map. Clicking on a marker will navigate to the locations and/or event's description here.

### 3. Navigation

**Tab Navigation** (Tab to Screen)

* Map Display
* Profile and Settings
* Even
**Flow Navigation** (Screen to Screen)

* Forced login
   * if no login, create account
* Map marker clicked
   * Clicking marker navigates to events screen
* Events list
   * Displays private and public events
   * Clicking an event will show its location on the map
* Profile
   * Toggle settings and preferences
* Chat
   * Chat with friends/strangers about event details

## Wireframes
<img src="https://i.imgur.com/kRNrU4D.jpg" width=600>

## Schema 

### Models

**Post**
| Property | Type | Description |
| -------- | ---- | ----------- | 
| objectID | String | unique id for the user post (default field) |
| author | Pointer to User | image author |
| image | File | image that user post | 
| location | FIND HOW TO SAVE LOC ON PARSE | image that user post | 
| title | String | title posted by author |
| caption | String | image caption by author |
| commentsCount | Number | number of comments posted to an image |
| likesCount | Number | number of likes for post |
| createdAt | DateTime | date when post is created (default field) |

**User**
| Property | Type | Description |
| -------- | ---- | ----------- | 
| objectID | String | unique id for the user (default field) |
| firstName | String | users first name |
| lastName | String | users last name |
| profilePic | File | image of user |
| age | String | age of user |
| email | String | email for user login |
| profileIntro | String | a small intro for user profiles |

**Comment** 
| Property | Type | Description |
| -------- | ---- | ----------- | 
| objectID | String | unique id for the user post (default field) |
| author | Pointer to User | image author |
| comment | String | comment by user |

**Bookmark**
| Property | Type | Description |
| -------- | ---- | ----------- | 
| objectID | String | unique id for the user post (default field) |
| author | Pointer to User | bookmark author |
| Bookmark | Pointer to Post | post that users want to save |

**Like**
| Property | Type | Description |
| -------- | ---- | ----------- | 
| objectID | String | unique id for the user post (default field) |
| author | Pointer to User | like author |
| like | boolean | if a user liked a post |

### Networking
* Map Screen   
  * (Read/GET) Query all posts near user
     ```swift
         let query = PFQuery(className:"Post")
         query.whereKey("author", equalTo: currentUser)
         query.order(byDescending: "createdAt")
         query.findObjectsInBackground { (posts: [PFObject]?, error: Error?) in
            if let error = error { 
               print(error.localizedDescription)
            } else if let posts = posts {
               print("Successfully retrieved \(posts.count) posts.")
           // TODO: Do something with posts...
            }
         }
* Register
  * (Create/POST) Create a new user object
      ```swift
          let user = PFObject(className:"User")
          user["firstName"] = userInput
          user["lastName"] = userInput
          user["profilePic"] = userInput
          user["age"] = userInput
          user["email"] = userInput
          user["profileIntro"] = userInput
          user.saveInBackground { (succeeded, error)  in
            if (succeeded) {
              // The object has been saved.
            } else {
              // There was a problem, check error.description
            }
          }
* Events Screen 
  * (Read/GET) Query all posts near user
      ```swift
         let query = PFQuery(className:"Post")
         query.whereKey(NEAR USER)
         query.order(byDescending: "createdAt")
         query.findObjectsInBackground { (posts: [PFObject]?, error: Error?) in
            if let error = error { 
               print(error.localizedDescription)
            } else if let posts = posts {
               print("Successfully retrieved \(posts.count) posts.")
           // TODO: Do something with posts...
            }
         }
  * (Create/POST) Create a new like on a post
      ```swift
          let like = PFObject(className:"Like")
          like["author"] = currentUser
          like["like"] = true
          like.saveInBackground { (succeeded, error)  in
            if (succeeded) {
              // The object has been saved.
            } else {
              // There was a problem, check error.description
            }
          }
  * (Delete) Delete existing like
       ```swift
          PFObject.deleteAll(inBackground: objectArray) { (succeeded, error) in
            if (succeeded) {
              // The array of objects was successfully deleted.
            } else {
              // There was an error. Check the errors localizedDescription.
            }
          }
  * (Create/POST) Create a new comment on a post
       ```swift
          let comment = PFObject(className:"Comment")
          comment["author"] = currentUser
          comment["like"] = true
          comment.saveInBackground { (succeeded, error)  in
            if (succeeded) {
              // The object has been saved.
            } else {
              // There was a problem, check error.description
            }
          }
  * (Delete) Delete existing comment
      ```swift
          PFObject.deleteAll(inBackground: objectArray) { (succeeded, error) in
            if (succeeded) {
              // The array of objects was successfully deleted.
            } else {
              // There was an error. Check the errors localizedDescription.
            }
          }
  * (Create/POST) Create new bookmark
     ```swift
          let bookmark = PFObject(className:"Bookmark")
          bookmark["author"] = currentUser
          bookmark["like"] = true
          bookmark.saveInBackground { (succeeded, error)  in
            if (succeeded) {
              // The object has been saved.
            } else {
              // There was a problem, check error.description
            }
          }
  * (Delete) Delete existing bookmark
      ```swift
          PFObject.deleteAll(inBackground: objectArray) { (succeeded, error) in
            if (succeeded) {
              // The array of objects was successfully deleted.
            } else {
              // There was an error. Check the errors localizedDescription.
            }
          }
* Chat Screen
  * (Read/GET) Query all users near author
      ```swift
         let query = PFQuery(className:"Post")
         query.whereKey(NEAR USER)
         query.order(byDescending: "createdAt")
         query.findObjectsInBackground { (posts: [PFObject]?, error: Error?) in
            if let error = error { 
               print(error.localizedDescription)
            } else if let posts = posts {
               print("Successfully retrieved \(posts.count) posts.")
           // TODO: Do something with posts...
            }
         }
* User Profile
  * (Read/GET) Query logged in user object
      ```swift
          let query = PFQuery(className:"User")
          query.getObjectInBackground(withId: "currentUser") { (User, error) in
            if error == nil {
              // Success!
            } else {
              // Fail!
            }
          }
  * (Update/PUT) Update user profile 
      ```swift
          let user = PFObject(className:"User")
          user["firstName"] = userInput
          user["lastName"] = userInput
          user["profilePic"] = userInput
          user["age"] = userInput
          user["email"] = userInput
          user["profileIntro"] = userInput
          user.saveInBackground { (succeeded, error)  in
            if (succeeded) {
              // The object has been saved.
            } else {
              // There was a problem, check error.description
            }
          }
  * (Read/GET) Query all Bookmarks where user is author
     ```swift
         let query = PFQuery(className:"Bookmark")
         query.whereKey("author", equalTo: currentUser)
         query.order(byDescending: "createdAt")
         query.findObjectsInBackground { (posts: [PFObject]?, error: Error?) in
            if let error = error { 
               print(error.localizedDescription)
            } else if let posts = posts {
               print("Successfully retrieved \(posts.count) posts.")
           // TODO: Do something with posts...
            }
         }
         ```
  * (Read/GET) Query all Posts where user is author
     ```swift
         let query = PFQuery(className:"Post")
         query.whereKey("author", equalTo: currentUser)
         query.order(byDescending: "createdAt")
         query.findObjectsInBackground { (posts: [PFObject]?, error: Error?) in
            if let error = error { 
               print(error.localizedDescription)
            } else if let posts = posts {
               print("Successfully retrieved \(posts.count) posts.")
           // TODO: Do something with posts...
            }
         }
         ```
  * (Read/GET) Query all Likes where user is author
      ```swift
          let query = PFQuery(className:"Like")
          query.whereKey("author", equalTo: currentUser)
          query.order(byDescending: "createdAt")
          query.findObjectsInBackground { (posts: [PFObject]?, error: Error?) in
            if let error = error { 
               print(error.localizedDescription)
            } else if let posts = posts {
               print("Successfully retrieved \(posts.count) posts.")
           // TODO: Do something with posts...
            }
         }
         ```
         
## Video Walkthrough
**Presentation**<br>

<img src="http://g.recordit.co/PwXFGWAJ5d.gif" width=250><br>

**App Demo**

<img src="http://g.recordit.co/uZh88amdB4.gif" width=250><br>

