const { Pool } = require('pg')

//set up pool connection to database
const pool = new Pool({
  connectionString: "postgres://cwhhswjupzuarc:5ba8ee634f7bd51cd973cce81e2f0d67043624009e4fbeeac2f886f9c4178be6@ec2-44-198-146-224.compute-1.amazonaws.com:5432/d6i8sk85eq598a",
  ssl: {
    rejectUnauthorized: false
  }
})

const AddElements = require('../add-elements')
const addElements = AddElements(pool)

module.exports = () => {
    const main = async (req, res) => {
        let elems = await addElements.filter()
        let towns = await addElements.getTowns()
        res.render('index', {
        townNames: towns,
        regNums: elems
        })
    }

    const reg = async(req, res) =>{
        addElements.setReg(req.body.reg)
        addElements.getTown(addElements.getReg())
        await addElements.setTownRef()
        await addElements.addReg()
        res.redirect('/')
    }

    const show = async (req, res) => {
        addElements.setChosenTown(req.body.town)
        console.log(await addElements.filter())
        res.redirect('/')
    }

    return {
        main,
        reg,
        show
    }
}