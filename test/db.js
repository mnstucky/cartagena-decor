const chai = require("chai");
const expect = chai.expect;

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("Database GET Tests on Entire Stock", function() {
    it("/api/db should return an array", function(done) {
        chai
            .request("http://localhost:3000")
            .get("/api/db")
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('array');
                done();
            });
    });
    it("/api/db should return items with correct multiples values", function(done) {
        chai
            .request("http://localhost:3000")
            .get("/api/db")
            .end(function(err, res) {
                for (resItem of res.body) {
                    expect(resItem.multiples.hasMultiples).to.be.a('boolean');
                    if (resItem.multiples.hasMultiples) {
                        expect(resItem.multiples.options).to.be.a('array');
                        for (opt of resItem.multiples.options) {
                            expect(opt).to.be.a('string');
                        }
                    }
                }
                done();
            });
    });
    it("/api/db should return items with names", function(done) {
        chai
            .request("http://localhost:3000")
            .get("/api/db")
            .end(function(err, res) {
                for (resItem of res.body) {
                    expect(resItem.name).to.be.a('string');
                }
                done();
            });
    });
    it("/api/db should return items with categories", function(done) {
        chai
            .request("http://localhost:3000")
            .get("/api/db")
            .end(function(err, res) {
                for (resItem of res.body) {
                    expect(resItem.category).to.be.a('string');
                }
                done();
            });
    });
    it("/api/db should return items with stocks", function(done) {
        chai
            .request("http://localhost:3000")
            .get("/api/db")
            .end(function(err, res) {
                for (resItem of res.body) {
                    expect(resItem.stock).to.be.a('number');
                }
                done();
            });
    });
    it("/api/db should return items with prices", function(done) {
        chai
            .request("http://localhost:3000")
            .get("/api/db")
            .end(function(err, res) {
                for (resItem of res.body) {
                    expect(resItem.price).to.be.a('number');
                }
                done();
            });
    });
    it("/api/db should return items with a highlight string", function(done) {
        chai
            .request("http://localhost:3000")
            .get("/api/db")
            .end(function(err, res) {
                for (resItem of res.body) {
                    expect(resItem.highlights).to.be.a('string');
                }
                done();
            });
    });
    it("/api/db should return items with description arrays of strings", function(done) {
        chai
            .request("http://localhost:3000")
            .get("/api/db")
            .end(function(err, res) {
                for (resItem of res.body) {
                    expect(resItem.description).to.be.a('array');
                    for (desc of resItem.description) {
                        expect(desc).to.be.a('string');
                    }
                }
                done();
            });
    });
    it("/api/db should return items with arrays of feature strings", function(done) {
        chai
            .request("http://localhost:3000")
            .get("/api/db")
            .end(function(err, res) {
                for (resItem of res.body) {
                    expect(resItem.features).to.be.a('array');
                    for (feat of resItem.features) {
                        expect(feat).to.be.a('string');
                    }
                }
                done();
            });
    });
    it("/api/db should not return any out-of-stock items", function(done) {
        chai
            .request("http://localhost:3000")
            .get("/api/db")
            .end(function(err, res) {
                for (resItem of res.body) {
                    expect(resItem.stock).to.be.greaterThan(0);
                }
                done();
            });
    });
});