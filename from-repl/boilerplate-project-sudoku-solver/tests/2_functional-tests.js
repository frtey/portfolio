const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite('Routing tests', function() {
    suite("POST request to /api/solve", function() {
      test("Solve a puzzle with valid puzzle string", done => {
        chai.request(server)
          .post('/api/solve')
          .type("form")
          .send({ puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37." })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'solution', 'Solution should be a property');
            assert.isString(res.body.solution, 'solution value should be a string');
            assert.equal(res.body.solution, "135762984946381257728459613694517832812936745357824196473298561581673429269145378", "Solution should be correct")
            done();
        });
      })

      test("Solve a puzzle with missing puzzle string", done => {
        chai.request(server)
          .post('/api/solve')
          .type("form")
          .send({ puzzle: "" })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'Error should be a property');
            assert.isString(res.body.error, 'Error value should be a string');
            assert.equal(res.body.error, "Required field missing")
            done();
          });
      })

      test("Solve a puzzle with invalid characters", done => {
        chai.request(server)
          .post('/api/solve')
          .type("form")
          .send({ puzzle: "1.5..2.84..63.12.7.2..5.....9..1./..8.2.3674.3.7.2..9.47...8..1..16....926914.37." })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'Error should be a property');
            assert.isString(res.body.error, 'Error value should be a string');
            assert.equal(res.body.error, "Invalid characters in puzzle")
            done();
          });
      })

      test("Solve a puzzle with incorrect length", done => {
        chai.request(server)
          .post('/api/solve')
          .type("form")
          .send({ puzzle: "1.5..2.84..63.12.7.2..5.....9..1." })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'Error should be a property');
            assert.isString(res.body.error, 'Error value should be a string');
            assert.equal(res.body.error, "Expected puzzle to be 81 characters long")
            done();
          });
      })

      test("Solve a puzzle that cannot be solved", done => {
        chai.request(server)
          .post('/api/solve')
          .type("form")
          .send({ puzzle: "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.." })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'Error should be a property');
            assert.isString(res.body.error, 'Error value should be a string');
            assert.equal(res.body.error, "Puzzle cannot be solved")
            done();
          });
      })

    })

    suite("POST request to /api/check", function() {

      test("Check a puzzle placement with all fields", done => {
        chai.request(server)
          .post('/api/check')
          .type("form")
          .send({ puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "A1", value: "7" })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'valid', 'valid should be a property');
            assert.isBoolean(res.body.valid, "valid should be a boolean")
            assert.isTrue(res.body.valid)
            done();
        });
      })

      test("Check a puzzle placement with single placement conflict", done => {
        chai.request(server)
          .post('/api/check')
          .type("form")
          .send({ puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "A1", value: "2" })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'valid', 'valid should be a property');
            assert.isBoolean(res.body.valid, "valid should be a boolean")
            assert.isFalse(res.body.valid)
            assert.property(res.body, "conflict", "conflict should be a property")
            assert.isArray(res.body.conflict, "conflict should be an array")
            assert.equal(res.body.conflict.length, 1, "conflict should have a single value")
            assert.include(res.body.conflict, "region")
            done();
        });
      })

      test("Check a puzzle placement with multiple placement conflicts", done => {
        chai.request(server)
          .post('/api/check')
          .type("form")
          .send({ puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "A2", value: "2" })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'valid', 'valid should be a property');
            assert.isBoolean(res.body.valid, "valid should be a boolean")
            assert.isFalse(res.body.valid)
            assert.property(res.body, "conflict", "conflict should be a property")
            assert.isArray(res.body.conflict, "conflict should be an array")
            assert.equal(res.body.conflict.length, 2, "conflict should have 2 values")
            assert.include(res.body.conflict, "region")
            assert.include(res.body.conflict, "column")
            done();
        });
      })

      test("Check a puzzle placement with all placement conflicts", done => {
        chai.request(server)
          .post('/api/check')
          .type("form")
          .send({ puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "A2", value: "5" })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'valid', 'valid should be a property');
            assert.isBoolean(res.body.valid, "valid should be a boolean")
            assert.isFalse(res.body.valid)
            assert.property(res.body, "conflict", "conflict should be a property")
            assert.isArray(res.body.conflict, "conflict should be an array")
            assert.equal(res.body.conflict.length, 3, "conflict should have 3 values")
            assert.include(res.body.conflict, "region")
            assert.include(res.body.conflict, "column")
            assert.include(res.body.conflict, "row")
            done();
        });
      })

      test("Check a puzzle placement with missing required fields", done => {
        chai.request(server)
          .post('/api/check')
          .type("form")
          .send({ puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "A2", value: "" })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'error should be a property');
            assert.isString(res.body.error, "error should be a string")
            assert.equal(res.body.error, "Required field(s) missing")
            done();
        });
      })

      test("Check a puzzle placement with invalid characters", done => {
        chai.request(server)
          .post('/api/check')
          .type("form")
          .send({ puzzle: "..9..5.1.85.4....2432......1...69.83.9../..6.62.71...9......1945....4.37.4.3..6..", coordinate: "a1", value: "7" })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'error should be a property');
            assert.isString(res.body.error, "error should be a string")
            assert.equal(res.body.error, "Invalid characters in puzzle")
            done();
        });
      })

      test("Check a puzzle placement with incorrect length", done => {
        chai.request(server)
          .post('/api/check')
          .type("form")
          .send({ puzzle: ".6.62.71...9......1945....4.37.4.3..6..", coordinate: "A1", value: "7" })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'error should be a property');
            assert.isString(res.body.error, "error should be a string")
            assert.equal(res.body.error, "Expected puzzle to be 81 characters long")
            done();
        });
      })

      test("Check a puzzle placement with invalid placement coordinate", done => {
        chai.request(server)
          .post('/api/check')
          .type("form")
          .send({ puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "/2", value: "5" })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'error should be a property');
            assert.isString(res.body.error, "error should be a string")
            assert.equal(res.body.error, "Invalid coordinate")
            done();
        });
      })

      test("Check a puzzle placement with invalid placement value", done => {
        chai.request(server)
          .post('/api/check')
          .type("form")
          .send({ puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "A2", value: "/" })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'error should be a property');
            assert.isString(res.body.error, "error should be a string")
            assert.equal(res.body.error, "Invalid value")
            done();
        });
      })

    })
  })
});

