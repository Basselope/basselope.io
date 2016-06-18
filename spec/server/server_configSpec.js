const request = require("request");

describe("server_config", function() {
  const baseURL = "http://localhost:8080/";

  describe("GET /", function() {

    it("should return status code 200", function(done) {
      request.get(baseURL, function(error, response, body) {
        response = response || { statusCode: '', request: { uri: { path: '' } }, headers: { 'content-type': '', 'content-length': 0 } };
        expect(response.statusCode).toEqual(200);
        done();
      });
    });

    it("should contain path /", function(done) {
      request.get(baseURL, function(error, response, body) {
        response = response || { statusCode: '', request: { uri: { path: '' } }, headers: { 'content-type': '', 'content-length': 0 } };
        expect(response.request.uri.path).toEqual('/');
        done();
      });
    });

    it("should return HTML", function(done) {
      request.get(baseURL, function(error, response, body) {
        response = response || { statusCode: '', request: { uri: { path: '' } }, headers: { 'content-type': '', 'content-length': 0 } };
        expect(body).toBeDefined();
        expect(response.headers['content-type']).toContain('text/html');
        expect(response.headers['content-length']).toBeGreaterThan(0);
        done();
      });
    });
  });

});