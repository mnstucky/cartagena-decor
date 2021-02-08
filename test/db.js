const chai = require("chai");
const assert = chai.assert;

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("Database GET Tests", function() {
    it("Test GET /api/db with no id", function(done) {
        chai
            .request("http://localhost:3000")
            .get("/api/db")
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.isArray(res.body);
                done();
            });
    });
});