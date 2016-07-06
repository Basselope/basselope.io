BASSELOPE
=========
*Utilizing natural-language-parsing and social media data from APIs including Reddit, Twitter, and WikiNews, our algorithm parses out relevant metrics on the tone of language used around a given topic. That enriched data is then visualized in the client.* 

A deployed version can be found at [basselope.io](http://basselope.io)

Refer to the [AirBnB .jsx style guide](https://github.com/airbnb/javascript/tree/master/react) for contributing.

For our git workflow guide visit the [CONTRIBUTING.md](https://github.com/Basselope/collatio/blob/dev/CONTRIBUTING.md)

###Todo

While Basselope is in a working-state and the initial, fast-paced development phase has concluded, basselope will continue to develope, improve, and change moving forward. That said, if you'd like to contribute, here are some things that currently need attention:

* large data sets causing client to hang on call to Reddit API with no error response
* implement web-workers and consolidate client-side heavy lifting to improve performance
* `d3Plot.jsx` animation re-running when route is returned to
    - needs an action dispatch-callback to select node on animation `'end'` event
    - causes slowdowns when rendering over 300 data points
* SVG responsive styling improvements; some graphs getting clipped by metric-bar
* styling/layout issues in firefox and safari (shovel worthy issue)

###Team

Development team consists of three full-stack engineers:

* [Ben Chen](https://github.com/byc219)
* [Rico Chen](https://github.com/ricochen)
* [Lukas Welinder](https://github.com/lukaswelinder)

