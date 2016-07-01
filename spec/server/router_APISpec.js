const axios = require("axios");
const router_API = require('../../app/server/router/router_API');

describe("router_API", function() {
  const baseURL = "basselope.io";
  let req = { url: '/_api/twitter/search', body: { query: 'pied piper' } };
  let POSTrequest = axios.post(`${baseURL}${req.url}`, req.body);

  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it("the request object should have a url and query property", function() {
    expect(req.url).toBeDefined();
    expect(req.body.query).toBeDefined();
  });

  it("should be a function that is called with a HTTP request", function() {
    expect(typeof router_API).toEqual('function');
  });

  it("should route to the path based on the URL", function(done) {
    req.url = '/_api/twitter/search';
    POSTrequest.then(response => {
      response = response || { statusCode: '', request: { uri: { path: '' } } };
      expect(response.request.uri.path).toEqual('/_api/twitter/search');
      done();
    });

    req.url = '/_api/reddit/search';
    POSTrequest.then(response => {
      response = response || { statusCode: '', request: { uri: { path: '' } } };
      expect(response.request.uri.path).toEqual('/_api/reddit/search');
      done();
    });

    req.url = '/_api/bing/search';
    POSTrequest.then(response => {
      response = response || { statusCode: '', request: { uri: { path: '' } } };
      expect(response.request.uri.path).toEqual('/_api/bing/search');
      done();
    });

    req.url = '/_api/bing/suggestions';
    POSTrequest.then(response => {
      response = response || { statusCode: '', request: { uri: { path: '' } } };
      expect(response.request.uri.path).toEqual('/_api/bing/suggestions');
      done();
    });
  });

  it("should make a GET request and return status code 200", function() {
    req.url = '/_api/twitter/search';
    POSTrequest.then(response => {
      response = response || { statusCode: '', request: { uri: { path: '' } } };
      expect(response.statusCode).toEqual(200);
      expect(response.author).toBeDefined();
      expect(Array.isArray(response.content)).toEqual(true);
      done();
    });
  });

  it("should return an object with an author and content property", function() {
    req.url = '/_api/twitter/search';
    POSTrequest.then(response => {
      response = response || { statusCode: '', request: { uri: { path: '' } } };
      expect(response.statusCode).toEqual(200);
      expect(response.author).toBeDefined();
      expect(Array.isArray(response.content)).toEqual(true);
      done();
    });
  });

});