# Productivity.Idle-popup

This repository is used to create the UI component that can be seen in the extension window for [Productivity.Idle](https://github.com/Gachuka/productivity.idle).

This contains all the functionality and is able to run on its own in the development environment.

# Build

Tech stack used
- **JavaScript**:  Language used to write *Productivity.Idle-content-script*
- **Axios**: Make API requests
- **Webpack**: Bundler to compile the JavaScript with dependencies into a static asset to be used.

## Features and Usage

An event listener to track users inputs to collect "characters" to be used as currency to buy upgrades.

Upgrades makes collecting "characters" faster to buy more upgrades to collect even faster!

An interval timer to save the progress automatically.

 - Main page
	 - A quick view on your current progress.
	 - Current Title
	 - Current Level, Experience Bar, Characters Accumulated
	 - A visual display on your inputs.
	 - Current multiplier per input
	 - Two buttons to take you to the Upgrade Page and Stats Page.

- Upgrade Page
	- Three available upgrades that you can buy by using your accumulated characters.
- Stats Page (Overall statistics)
	- Total characters accumulated
	- Usable characters left
	- Total upgrades bought
	- Current multiplier per input


# Getting Started

A build (compiled version) of this repository is used as the interface of the Chrome Extension [Productivity.Idle](https://github.com/Gachuka/productivity.idle). 

It is possible to run Productivity.Idle-popup by itself as a SPA (single page app).

## Development Environment (Local)

### System Requirements

Before you begin, make sure you have all the below installed:
- [Node.js v16 or above](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Initializing all the packages

Execute the following command in the project root folder:

```
npm install
```
This will install the required dependencies needed.

### Run as SPA (single page app)

Execute the following command in the project root folder:

```
npm start
```

### Bundle to implement into chrome extension

Execute the following command in the project root folder:

```
npm run build
```
This will create a "build" folder in the root folder.

Copy over the contents in "static" folder and "asset-manifest.json" file to the chrome extension, replacing the CSS and JS files.

Copy over index.html and replace that too.

# Lessons Learned

The app was built with the use of BrowserRouter to navigate the different pages. Since there is no URL in a chrome extension, BrowserRouter can not rely on the URL path to navigate properly to the different pages.

MemoryRouter on the other hand stores the URL in memory and navigates the pages through memory routes.

Planning out the logic needed properly from the start can help make the functionality of the code less confusing. If it does get too confusing, it does not hurt to rewrite.

# Next Steps

For the chrome extension: 

- Adding a prestige system to progress even further at a faster pace.

- Figure out a way to communicate "logged in" status to the background listener and also knowing which user is logged in to GET and PUT to the correct user in the backend.