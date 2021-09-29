const { Pool } = require('pg')

const GreetFactory = require('../namesGreeted')
const LanguageFactory = require('../languagePicker')

const languagePicker = LanguageFactory()

const pool = new Pool({
    connectionString: 'postgres://oygnbgbdfpfsyl:325a9a8705dc1bd16a4339834a7d345a8d2f25babe8d74cd6f08c84131d15c67@ec2-18-215-44-132.compute-1.amazonaws.com:5432/ddd21pda85tb2v',
    ssl: {
      rejectUnauthorized: false
    }
})

const namesGreeted = GreetFactory(pool)

module.exports = () => {
    const main = async (req, res, next) => {
        namesGreeted.nameCount()
        .then(result => {
            res.render('index', {
                name: namesGreeted.getName().charAt(0).toUpperCase()+namesGreeted.getName().slice(1, namesGreeted.getName().length),
                greetText: languagePicker.getGreetText(),
                namesList: result,
                message: req.flash('warning')
            })
        })
        .catch(error => console.log(error))
    }

    const names = async(req, res, next) => {
        if(!req.body.language && req.body.name == ""){
            req.flash('warning', 'Please enter name and language')
            res.redirect("/")
            return
        }else if(req.body.name == ""){
            req.flash('warning', 'Please enter name')
            res.redirect("/")
            return
        }else if(!req.body.name.match(/^[A-Za-z]+$/)){
            req.flash('warning', 'Please enter valid name')
            res.redirect("/")
            return
        }else if(!req.body.language){
            req.flash('warning', 'Please choose language')
            res.redirect("/")
            return
        }else {
            namesGreeted.setName(req.body.name)
            languagePicker.setLanguage(req.body.language)
            languagePicker.setGreetText()
            res.redirect("/")
        }
    }

    const counter = async(req, res, next) => {
        namesGreeted.removeNames()
        req.flash('warning', 'Counter Cleared')
        res.redirect("/")
    }

    const greeted = async (req, res, next) => {
        namesGreeted.namesList()
        .then(result => {
          res.render('greeted',{
            uniqueNames: result
          })
        })
        .catch(error => console.log(error))
    }

    const greetList = async(req, res, next) => {
        namesGreeted.greetCount()
        .then(result => {
          res.render("greettimes", {
            nameGreeted: req.params.name,
            numOfTimesGreeted: result
          })
        })
        .catch(error => console.log(error))
    }

    return {
        main,
        names,
        counter,
        greeted,
        greetList
    }
}