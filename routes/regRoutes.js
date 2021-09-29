// const { Pool } = require('pg')

const AddElements = require('../add-elements')
const addElements = AddElements()

module.exports = () => {
    const main = async (req, res) => {
        res.render('index', {
            regNums: addElements.getElemArray()
        })
    }

    const reg = async(req, res) =>{
        addElements.setElemArray(req.body.reg)
        console.log(addElements.getElemArray())
        res.redirect('/')
    }

    return {
        main,
        reg,
        // counter,
        // greeted,
        // greetList
    }
}