# WebEye - Eye controlled e-book reader web application 👁 📖 💻

## Table of Contents

1. [Overview](#1-Overview)
2. [Goals and Motivations](#2-Goals-and-Motivations)
3. [Design Process](#3-Design-Process)
    1. [Interaction Plan](#31-Interaction-Plan)
    2. [Breakdown](#32-Breakdown)
4. [Implementation](#4-Implementation)
    1. [Hardware](#41-Hardware)
    2. [Software](#42-Software)
5. [Demo](#5-Demo)
6. [Example Use Case](#6-Example-Use-Case)

## 1. Overview
The Eye-Book-Reader is a web application that uses an eye tracking API to enhance user interaction. The primary interaction being the support for an flipping through the book’s pages that follows the user eyes as they look to the left or to the right. The eye tracking API used was WebGazer.js as it was easiest to use for development of the application. WebGazer.js works by training a prediction model and webcam feed to track the location on the screen the user is looking. The model is trained by assuming that when a user clicks they are also looking at that location, this can be used to initiate the model and to help correct the model during use of the application. This model is saved between sessions so initiation has to only be done once. This application will thus be able to allow the reading of eBooks without hands on interaction. Applications of the EyeBook Reader could include the reading of a cooking book while cooking and maybe even allow people that are limited or unable to use input devices such as mouse and keyboard to also be able to access eBooks.

## 2. Goals and Motivations
We were tasked with building an ebook reader web application that is hooked up to a eye tracking system as part of the user interface, the EyeBook Reader. The eye tracking system was utilized to perform tasks such as book selection and navigating the book pages. This is intended to be an easier method for the user to use than having to actively navigate the page with the mouse, as the page will move down when the user looks down and vice versa. So as the user is reading the EyeBook Reader will scroll along to allow the user to continue reading without having additional input, thus facilitating a smoother reading experience.

## 3. Design Process

### 3.1 Interaction Plan
**Book Reading Page**
![Figure 1: Interaction Design Plan - Book Reading Page](/int2.jpeg?raw=true "Figure 1: Interaction Design Plan - Book Reading Page")
**Library Page**
![Figure 2: Interaction Design Plan - Library Page](/int1.jpeg?raw=true "Figure 2: Interaction Design Plan - Library Page")

### 3.2 Breakdown
In the primary interaction design of using the eye tracking software we wanted it use it to translate eye movement to movement of the eBook’s pages. As a group we thought of two distinct methods of implementing this interaction, the first being analogous to how one normally flips the pages of a books from left or right and the latter idea to scroll up and down the book like one would normally navigate a web page.
We implemented both methods flipping left to right and scrolling up and down. After an initial test phase we found that the user looking left and right in order to flip pages of a book was more natural and kept the "integrity" of books that people have grown accustom to when reading. This choice also had the added benefit of allowing our eye-book-reader to work on all types of PDFs. Furthermore we designed the interaction for the user to look at the top-left corner in order to return to a "library" page where other book options can be selected. This location was chosen because the back button on browsers is located in this location and thus could feel natural to users. The final interaction design for our book reading web page was bookmarking. We planned for the user to look towards the top browser in order for their current page to be bookmarked. Implementation of this design interaction was not completed. Going back, the first interaction design for the user is in the eBook selection page, the Library Page, were the user can select from a catalog of available eBooks. Selection an eBook can be done by having the user stare at the wanted eBook for 1.5 seconds. This delay period in selecting the book is to prevent accidental selection while also being short enough to still be responsive. Finally the user will be able to scroll through the library web page by looking up and down.
Several considerations of the interaction design was made for the interface design. The design and elements meant to be selected needed to be big. This is because the WebGazzer.js eye tracking API is limited in it’s ability to be accurate. Therefore the bigger selectable elements allows for the eye tracking to have larger margins of error. Another limitation of the eye tracking is that it needs to build it’s model by associating points clicked on the screen with where the user is looking. Because of this the web app will be mouse compatible to help build and correct the prediction model. When a user is selecting an element with the eye tracking there should be a time or progress bar to give user feedback on the delay till selection is determined to have been made.

## 4. Implementation

### 4.1 Hardware
The EyeBook Reader we have made is designed as a web application meant for laptop or desktop use. The eye tracking API requires the user to have and allow access to a webcam in order to properly function. This means that since most laptops come with webcams and desktops do not typically come with one they will be the major device we aim to target. We ruled out having the EyeBook Reader on mobile devices as the limited screen size would limit the accuracy of the eye-tracking API. We used Chrome, on the latest version, as the web browser of choice that was used for design and testing of the application.

### 4.2 Software

#### Decision Matrix
|       | Ease of Use | Features      | Supported |
| ----------- | ----------- | ----------- | ----------- | 
| GazeCloudAPI | ⭐️⭐️       | ⭐️       | ⭐️⭐️⭐️       |
| MediaPipe   | ⭐️⭐️       | ⭐️⭐️       | ⭐️⭐️⭐️       |
| OpenCV    | ⭐️       | ⭐️⭐️⭐️       | ⭐️⭐️⭐️⭐️       |
| WebGazer.js     | ⭐️⭐️⭐️       | ⭐️       | ⭐️⭐️⭐️       |

#### Stack Breakdown
The EyeBook Reader is a web application based on HTML5, CSS3, and JavaScript. Multiple eye tracking APIs where looked at for this application including GazeCloudAPI, MediaPipe, OpenCV, and WebGazer.js. WebGazer.js was chosen as it was the easiest to use for development of the web application. WebGazer.js is used for tracking eye movement, and allows the storage of x and y coordinates through a correlation map between eye position and screen coordinate position, which is later loaded into the regression model. This model is trained by assuming that the points the user clicks on the screen is also where the user is looking. This is used for to a first time initialization process and then continually for the user to reinforce and correct for errors in the prediction model. The WebGazer.js API adds a display of the webcam feed onto the top left of the screen and shows a dot where it believes the user is looking.
To implement the interaction design we had to define both the region were the user will be looking and the delay for how long the use should look there. In the library page this was done by defining one eight of either side of the page as the selection area for a certain book. If the user look to the left after 1.5 seconds the book on the left was selected and vice versa. in that direction. The eBook page was divided between the left, middle, and right section. Looking in the left section for 0.5 seconds will flip the page left, similarly looking in the right section would flip the page right. The middle section would be where the user would be able to read the text without moving the page. All other interaction design features where implemented in a similar manner by receiving the x and y coordinates of where a user is looking through webGazer.js and registering how long they are looking in a certain region.

## 5. Demo

### Introduction  Page
![Figure 1: Interaction Design Plan - Book Reading Page](/git-images/webeye-1.png?raw=true "Figure 1: Interaction Design Plan - Book Reading Page")

### Library Page
![Figure 1: Interaction Design Plan - Book Reading Page](/git-images/webeye-3.png?raw=true "Figure 1: Interaction Design Plan - Book Reading Page")

### Instructions Page
![Figure 1: Interaction Design Plan - Book Reading Page](/git-images/webeye-2.png?raw=true "Figure 1: Interaction Design Plan - Book Reading Page")

### Reading Page
![Figure 1: Interaction Design Plan - Book Reading Page](/git-images/webeye-4.png?raw=true "Figure 1: Interaction Design Plan - Book Reading Page")



## 6. Example Use Case
Eye-tracking can help users with motor disabilities. Ideally, this would work out of the box for these users but it does not because the accuracy of the WebGazer.js API relies on mouse clicks. However, other assistive technologies can help people engage with this application using only their eyes. For example, some people who have no control of their hands use a device called a mouth stick to interact with keyboards and computer mouses. This device paired with a mouse that has a large trackball and large buttons could be used to train the API. This type of mouse is not needed but it is very helpful because it makes it easier to click buttons and scroll using a mouth stick. A challenge that comes from this approach is that the user’s head has to be in the camera’s view while using this EyeBook Reader. Normally this is not a problem, but it is when users are using a mouth stick to train the API. This is because a user would have to move their head towards their mouse to click it. Usually, people put their mouse on the side of their computer which is out of the camera view. So when a user clicks their mouse, the camera cannot see their head. To adjust, users would have to put their mouse right in front of their computer so that when they click, the camera sees their head. Luckily, our application displays a camera view and lets the user know when the camera cannot see their head. Another challenge with this approach is that the user will have to learn how to use a mouth stick if they have not already.
Eventually, with enough training, the API will be accurate enough to only rely on the user’s eyes. At that point, they could stop using their assistive technologies and only use their eyes. This initial training period may be off-putting to some users and may cause them to stop using the application. However, they may be drawn to this application because of the cost. Using this application is free, mouth sticks are relatively cheap, and most households have a computer mouse. So if users are willing to get over that initial training period, they could save money. Also, this API saves eye-tracking data between sessions meaning users do not have to train it every time they use it. This allows users to have a comfortable reading experience using mainly their eyes. Having users with motor disabilities train the API is not ideal, but it doesn’t completely negate the usefulness of this application.




