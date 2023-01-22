# Beer App | tech test

##### 🔗deployed on netlify: [link](https://beer-apparatus.netlify.app/)

🍺 implemented functionality
🚧 under construction functionality
🙅 not attempted functionality

#### ⏱Time

functionality: 3-4hrs
CSS: roughly 1hr

### 📜Requirements

##### List View:

🍺 The application has a main interface/page which shows a list of beers withbasic details like name, tagline, image, and abv value.
🍺 The list should be paginated, and should support basic page navigation to see more beer options.

##### Search:

🍺 The main page also supports searchable interface, where users can search for a particular beer by name.

##### Detail View:

🍺 When a user clicks on a particular beer item, they should end up on a beer detail view, where we display detailed information about a beer. Here, feel free to add more details you will like to see apart from the basic ones.

### 🎁Bonus Points

🍺 To extend search functionality, implement ABV filters which show a list of beers
depending upon ABV value being lower or higher than a value chosen by the user.
🙅 Support autocomplete in search interface, displaying a list of beers based on search-text entered by the user.
🙅 Whenever a user searches for a particular beer using search and filters, they want to share the results with their friends. Support query friendly URLs.
🚧 Mobile Responsiveness.
🚧 Implement component unit tests.

---

#### ⏱ With more time;

I would have looked more into fetching only when needed. I started out fetching one page at a time, but I found this didn't work well for the search bar, as it then only looked through one page, where's I wanted it to be able to look through the whole database. However I think it could possibly be better to only fetch the data when needed so I'd like to explore that route.
I also would've wanted to tackle the rest of the bonus functionality as well as spent more time on the CSS.

---

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
