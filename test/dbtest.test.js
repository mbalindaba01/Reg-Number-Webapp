const assert = require('assert')
const AddElements = require('../add-elements')
const pg = require("pg")
const Pool = pg.Pool


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'reg_tests',
    password: 'Minenhle!28',
    port: 5432,
})

let addElements = AddElements(pool)


describe('The database', function () {

    beforeEach(async() => {
        // clean the tables before each test run
        await pool.query("truncate reg_numbers")
    })

    it('should be able to set the town that the reg number belongs to', async () => {
        addElements.getTown("CA000000")
        assert.equal("Cape Town", await addElements.setTownRef())
    });

    // it('should be able to set names and get them from database', async () => {
    //     await namesGreeted.setName("Mbali")
    //     assert.deepEqual("mbali", namesGreeted.getName())
    // });

    // it('should be able to count how many times each user has been greeted', async () => {
    //     await namesGreeted.setName("Simo")
    //     await namesGreeted.setName("Simo")
    //     assert.equal(2, await namesGreeted.greetCount())
    // });

    // it('should test duplication in the database', async () => {
    //     await namesGreeted.setName("Yonela")
    //     await namesGreeted.setName("yoNela")
    //     assert.equal(1, await namesGreeted.nameCount())
    // });

    // it('should be able to reset the database', async () => {
    //     await namesGreeted.setName("Mbali")
    //     namesGreeted.removeNames()
    //     assert.equal(0, await namesGreeted.nameCount())
    // });

    after(() => {
        pool.end();
    })
});