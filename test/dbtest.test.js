const assert = require('assert')
const AddElements = require('../add-elements')
const pg = require("pg")
const Pool = pg.Pool

let useSSL = false
let local = process.env.local || false
if(process.env.DATABASE_URL && !local){
    useSSL = true
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgresql://postgres:Minenhle!28@localhost:5432/reg_tests",
    // ssl: {
    //   rejectUnauthorized: false
    // }
  })

let addElements = AddElements(pool)


describe('The database', function () {

    beforeEach(async() => {
        // clean the tables before each test run
        await pool.query("truncate reg_numbers")
    })

    it('should be able to set the town that the reg number belongs to', async () => {
        addElements.setReg("CA001100")
        addElements.getTown(addElements.getReg())
        assert.equal(1, await addElements.setTownRef())
    })

    it('should be able to save the reg number and town reference number put in by the user to the database', async () => {
        addElements.setReg("CA00000")
        addElements.getTown(addElements.getReg())
        addElements.addReg()
        assert.deepEqual("CA00000", await addElements.getRegFromDb())
    })

    

    // it('should be able to set names and get them from database', async () => {
    //     await namesGreeted.setName("Mbali")
    //     assert.deepEqual("mbali", namesGreeted.getName())
    // });

    // it('should be able to count how many times each user has been greeted', async () => {
    //     await namesGreeted.setName("Simo")
    //     await namesGreeted.setName("Simo")
    //     assert.equal(2, await namesGreeted.greetCount())
    // });

    it('should be able to return the list of towns available to choose from', async () => {
        await addElements.getTowns()
        assert.deepEqual([
            {
              town_id: 1,
              town_name: 'Cape Town'
            },
            {
              town_id: 2,
              town_name: 'Bellville'
            },
            {
              town_id: 3,
              town_name: 'Paarl'
            }
          ], await addElements.getTowns())
    });

    it('should be able to reset the database', async () => {
        addElements.setReg("CA00000")
        addElements.getTown(addElements.getReg())
        await addElements.addReg()
        addElements.removeReg()
        assert.deepEqual(0, await addElements.getcount())
    });

    after(() => {
        pool.end();
    })
});