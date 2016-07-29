# Basselope

[Basselope](http://basselope.io) is a web application that extracts and visualizes sentiment values of social media content. Statistical analysis and natural language processing are heavily used in our algorithm to parse out relevant metrics and related topics. That enriched data is visualized on the client in ways that provide context and insight into popular opinion on the given topic.

![Basselope](https://github.com/Basselope/basselope.io/tree/dev/app/public/assets/basselope.jpg)


## Technology
 * Frontend: React, Redux, D3, and Materialize
 * Backend: Express, Node, nlp_compromise, sentiment
 * Testing: Jasmine and Enzyme
 * Build Tools: Webpack and Gulp

## Setup

We use webpack to bundle our files and gulp to watch the client and server for any changes.
During development, the server ran on localhost port 8080.

* `npm install` to install our dependencies
* `gulp launch --dir server` to bundle the files and start the server on localhost:8080


## Team

Development team consists of three full-stack engineers:

* Ben Chen [<img src="http://cdn.flaticon.com/png/256/25231.png" width=20 />](https://github.com/byc219) [<img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_black-512.png" width=20 />](https://www.linkedin.com/in/benychen)
* Rico Chen [<img src="http://cdn.flaticon.com/png/256/25231.png" width=20 />](https://github.com/ricochen) [<img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_black-512.png" width=20 />](https://www.linkedin.com/in/ricochenx)
* Lukas Welinder [<img src="http://cdn.flaticon.com/png/256/25231.png" width=20 />](https://github.com/lukaswelinder) [<img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_black-512.png" width=20 />](https://www.linkedin.com/in/lukaswelinder)


## Future of Basselope

We are always looking for ways to improve Basselope. If you're interested in helping out, or have any ideas for features or fixes, feel free file and issue or make a pull request. For our git workflow and style guides, take a look at [CONTRIBUTING.md](https://github.com/Basselope/collatio/blob/dev/CONTRIBUTING.md). Below are some tasks that need attention:

### Optimization

* Distribute fetch & parse tasks across a cluster to reduce load on our front-facing server.
* Implement web-workers and consolidate client-side heavy lifting to improve performance
    - also useful to improve ease of data flow and clarity of design patterns with regard to D3 & Redux

### Fixes

* Large data sets occasionally causing client to hang on call to Reddit API with no error response.
* `d3Plot.jsx` animation re-running when route is returned to.
    - needs an action dispatch as callback to re-select node on animation `'end'` event
    - causes slowdowns when rendering over 300 data points
* SVG responsive styling improvements and fixes
    - some graphs getting clipped by metric-bar
    - styling/layout issues in firefox and safari (shovel worthy issue)

