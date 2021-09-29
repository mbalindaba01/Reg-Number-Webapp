const assert = require('assert')
const NamesGreeted = require('../namesGreeted')
const pg = require("pg")
require('dotenv').config()
const Pool = pg.Pool


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testwebapp',
    password: 'Zanokuhle!28',
    port: 5432,
})

let namesGreeted = NamesGreeted(pool)


describe('The greetings-webapp database', function () {

    beforeEach(async() => {
        // clean the tables before each test run
        await pool.query("delete from users")
    })

    it('should be able to count the names greeted in the database', async () => {
        await namesGreeted.setName("Lungile")
        await namesGreeted.setName("Sabie")
        assert.equal(2, await namesGreeted.nameCount())
    });

    it('should be able to set names and get them from database', async () => {
        await namesGreeted.setName("Mbali")
        assert.deepEqual("mbali", namesGreeted.getName())
    });

    it('should be able to count how many times each user has been greeted', async () => {
        await namesGreeted.setName("Simo")
        await namesGreeted.setName("Simo")
        assert.equal(2, await namesGreeted.greetCount())
    });

    it('should test duplication in the database', async () => {
        await namesGreeted.setName("Yonela")
        await namesGreeted.setName("yoNela")
        assert.equal(1, await namesGreeted.nameCount())
    });

    it('should be able to reset the database', async () => {
        await namesGreeted.setName("Mbali")
        namesGreeted.removeNames()
        assert.equal(0, await namesGreeted.nameCount())
    });

    after(() => {
        pool.end();
    })
});