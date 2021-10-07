const { Pool } = require('pg')

// let useSSL = false
// let local = process.env.local || false
// if(process.env.DATABASE_URL && !local){
//     useSSL = true
// }

//set up pool connection to database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:Minenhle!28@localhost:5432/registration_numbers",
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
        regNums: elems,
        message: req.flash('warning')
        })
    }

    const reg = async(req, res) =>{
        addElements.setReg(req.body.reg)
        let digits = addElements.getReg().slice(2, addElements.getReg().length)
        if(req.body.reg == ""){
            req.flash('warning', 'Please enter registration number')
            res.redirect("/")
        }else if(!(addElements.getReg().startsWith("CA") || addElements.getReg().startsWith("CY") || addElements.getReg().startsWith("CJ"))){
            req.flash('warning', 'Please enter registration number from Cape Town, Paarl or Bellville')
            res.redirect("/")
        }else if(!digits.match('^[0-9]+$') || addElements.getReg().length > 10){
            req.flash('warning', 'Please enter valid registration number')
            res.redirect('/')
        }else if(await addElements.regExists() > 0){
            req.flash('warning', 'Registration number already exists')
            res.redirect('/')
        }else {
        addElements.getTown(addElements.getReg())
        await addElements.setTownRef()
        await addElements.addReg()
        await addElements.getRegFromDb()
        res.redirect('/')
        }
    }

    const show = async (req, res) => {
        addElements.setChosenTown(req.body.town)
        if(await addElements.countReg() == 0) {
            console.log("Mbali")
            req.flash('warning', 'None of the registration numbers are from there')
        }
        res.redirect('/')
    }

    const remove = async (req, res) => {
        addElements.removeReg()
        res.redirect('/')
    }

    return {
        main,
        reg,
        show,
        remove
    }
}