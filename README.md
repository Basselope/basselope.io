<!--
WHEN LOGO IS COMPLETED
# [Logo](https://github.com/Basselope/basselope.io/app/public/assets/logo.jpg or png) Basselope
-->
# Basselope

[Basselope](http://basselope.io) is a web application that enriches data visualzation of sentiment values on social media data. Statistical analysis and natural language processing is used in our algorithm to parse out relevant metrics and trending data on a given topic.

<!-- Basselope image here -->


## Technology
<!-- Include technology reasons here like: https://github.com/hankfanchiu/chime -->


## Setup

We use webpack to bundle our files and gulp to watch the client and server for any changes.
During development, the server was running on localhost port 8080.

* `npm install` to install our dependencies
* `gulp launch --dir server` to bundle the files and start the server on localhost:8080


## Team

Development team consists of three full-stack engineers:

* Ben Chen [<img src="http://cdn.flaticon.com/png/256/25231.png" width=20>](https://github.com/byc219)
* Rico Chen [<img src="http://cdn.flaticon.com/png/256/25231.png" width=20>](https://github.com/ricochen)
* Lukas Welinder [<img src="http://cdn.flaticon.com/png/256/25231.png" width=20>](https://github.com/lukaswelinder)


## Future Implementations

While Basselope is in a working-state and the initial, fast-paced development phase has concluded, basselope will continue to develope, improve, and change moving forward. That said, if you'd like to contribute, here are some things that currently need attention:

* Large data sets causing client to hang on call to Reddit API with no error response
* Implement web-workers and consolidate client-side heavy lifting to improve performance
* `d3Plot.jsx` animation re-running when route is returned to
    - Needs an action dispatch-callback to select node on animation `'end'` event
    - Causes slowdowns when rendering over 300 data points
* SVG responsive styling improvements; some graphs getting clipped by metric-bar
* Styling/layout issues in firefox and safari (shovel worthy issue)

For our git workflow guide take a look at [CONTRIBUTING.md](https://github.com/Basselope/collatio/blob/dev/CONTRIBUTING.md)