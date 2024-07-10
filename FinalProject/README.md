# Piecekeeper
#### Video Demo:  <URL HERE>
#### Description:
##### Abstract
Piecekeeper is a web application that helps users to record their progress of practising musical pieces. The records of Piecekeeper can summarise the time users spent and important ideas came out during their practice on a specific piece (such as the 8th bar in ABC piece is challenging and spent 15 mins on it). Besides, users are always welcomed to revisit the old pieces they have completed a long time ago and feel the achievement they have made over time.

##### Live Demo
**What you need to run the code**
1. [Node.js](https://nodejs.org/en)
2. [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
3. [MongoDB](https://www.mongodb.com/)

**How to run the code**
1. Run MongoDB on your system, with port mongodb://localhost:27017
2. Clone this repository
3. Open the first command line terminal in the ```clonedFolderDirectory/backend``` directory, and run ```npm install``` or ```yarn``` to install and update the dependencies. Then run ```nodemon index.js```
4. Open another command line terminal in the ```clonedFolderDirectory/frontend``` directory, and run ```npm install``` to install and update the dependencies. Then run ```npm run dev```
5. Open localhost:5173 in the browser

##### Logic
Piecekeeper is developed using a MERN stack technologies, which is considered one of the most popular options currently. Also the Tailwind CSS framework is used.

While using Piecekeeper, users can view all pieces in progress via a reactive accordion list on the homepage. By opening the accordion, users can see the recent tasks they have completed with time spent. Inside the details page of each piece, users can write down a description about the piece as a reminder, and tasks are nested into the piece.
Inside the piece viewing page, a brief table of tasks can be reviewed. Each task includes data of
- Date
- Task Name
- Task Duration (Time spent, in hour and minute)
- Remark (Optional)
At the current version, the practice date is assumed to be the date which the task is created.


##### Future Update
This version of Piecekeeper has just finished its basic CRUD stage, but it should not be limited to this basic style in the future. Here are some ideas:
- Visualising daily, weekly time spent of all or a specific piece using **[D3](https://d3js.org/)**
- Guest and User login using **Session** and **Cookies**
- Based on the user function, interaction between users is allowed. Users can then find friends via username and other identifiers, can view others' progress and complete mission together like how *[Duolingo](https://www.duolingo.com/)* works.

