# README

## Background

We created this project for our Data Visualization and Analysis course at Georgia Tech. A team of 6 students used [The Metropolitan Museum of Art Open Access CSV](https://github.com/metmuseum/openaccess) to put together a website that offers analysis and a tool for users to optimize their trip when visiting the MET!

## Summary of Tech Stack

This project was built using [Next.js](https://nextjs.org/) which is a full stack framework using React on the front end and node.js on the backend. It is convenient because all within one repo you can have frontend and backend code next to each other and work seamlessly. Further more, the company that created and manages the framework, Vercel, offers an easy deployment solution. If you use there service to host then it is very low config. It additionally comes with a CI/CD pipeline using git hooks. Every time a commit is pushed to the main branch, Vercel will get notified to rebuild the app and deploy it to the website.

Fortunately for our class project use case we are able to stay within the free tier which makes this a perfect solution for our needs. We use the frontend react to present the data and to allow for user interaction meanwhile the backend can handle the loading and processing of data.

The website is live at the following URL: [https://ga-tech-dva-group-project.vercel.app/](https://ga-tech-dva-group-project.vercel.app/)

## Setup / Viewing the website

Like mentioned above the website is live and most easily can be seen by visiting the website link  
here: [https://ga-tech-dva-group-project.vercel.app/](https://ga-tech-dva-group-project.vercel.app/)  
but local development/testing is also possible by following the next steps

### Environment setup

First you must download [Node.js](https://nodejs.org/en) to be able to execute javascript code in its own standalone enviroment outside of the browser context. This is what makes up the backend portion of the tech. stack. Furthermore, node.js comes bundled with the default package manager for javascript libraries, Node Package Manager (NPM). Optionally you can use npm to install yarn which is a popular alternative package manager that offers additional features. Either will work but the commands to start the development server will use each one's command respectively (npm or yarn)

Now that node is installed you will want to be sure to have a text-editor or IDE of your choice to view, make changes, and run the code. Personally, the team recommends [visual studio code](https://code.visualstudio.com/) since the extensions, integrated terminal, integrated source control, and other features make it very easy to work with.

### Cloning the repo

With the environment setup now the next step is to clone the project repo that way we can get the code downloaded locally on our machine. The repo is hosted and publicly available on github found here:
[https://github.com/bkelley36/ga-tech-dva-group-project](https://github.com/bkelley36/ga-tech-dva-group-project)

### Starting the local web server

With the code downloaded open up the root folder in your text editor / ide / terminal. From the integrated terminal within whatever software you chose, or the terminal itself, run the command that corresponds with your package manager <code>npm install</code> or <code>yarn install</code> once the command finishes fetching the required dependencies you then can start the local development server using <code>npm dev</code> or <code>yarn dev</code> as tne scripts are configured in package.json. Alternatively you can run <code>next dev</code> directly.

From here you will get an output that the server is ready and listening for changes. The default port is localhost:3000, if that port is not available it will increment by 1 to find the next available port (3001 for example).

Navigating to the correct localhost port with your browser of choice will now display the website. The server will be listening to hot reload any changes made to the code. Now the development server is successfully up and running locally!
