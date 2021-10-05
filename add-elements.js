module.exports = (pool) => {
    let regNum = ""
    let regNames = []
    let elemArray = []
    let errorText 
    let towns = []
    let townRef = 0
    let filterState = "All"

    //set and get reg numbers
    const setReg = (num) => {
        regNum = num.toUpperCase().replace(/ /g, '')
    }

    const getReg = () => {
        return regNum
    } 

    //get the town that the reg number belongs to
    const getTown = (ref) => {
        if(ref.startsWith('CA')) {
            return "Cape Town"
        }else if(ref.startsWith('CY')){
            return "Paarl"
        }else if(ref.startsWith('CJ')){
            return "Bellville"
        }
    }

    //find the town_ref of the town the reg number belongs to
    const setTownRef = async() => {
        townRef = await pool.query("select town_id from towns where town_name = $1", [getTown(getReg())])
        return townRef.rows[0].town_id
    }

    //get list of towns that the reg numbers belong to
    const getTowns = async() => {
        towns = await pool.query("select * from towns")
        return towns.rows
    }

    //add the registration number with its town reference to the reg numbers table
    const addReg = async () => {
        await pool.query("insert into reg_numbers (town_ref, reg_num) values ($1, $2)", [await setTownRef(), getReg()])
    }

    //set and get array of existing reg numbers
    const getElemArray = async () => {
        let arr = await pool.query("select * from reg_numbers")
        return arr.rows
    }

    const regExists = async () => {
        let counter = await pool.query("select count(reg_num) from reg_numbers where reg_num = $1", [getReg()])
        return counter.rows[0].count
    }

    //set and get chosen town name to filter
    const setChosenTown = (town) => {
        filterState = town
    }

    const getChosenTown = () => {
        return filterState
    }

    //filter through reg numbers 
    const filter = async () => {
        let allTowns = await getElemArray()
        let selectedTowns 
        if(getChosenTown() == 'All'){
            selectedTowns = allTowns
        }else{
            selectedTowns = allTowns.filter(town => town.town_ref == getChosenTown())
        }
        return selectedTowns
    }

    const countReg = async () => {
        let allReg = await getElemArray()
        let selectedReg
        if(getChosenTown() == 'All'){
            selectedReg = allReg
        }else{
            selectedReg = allReg.filter(town => town.town_ref == getChosenTown())
        }
        return selectedReg.length
    }

    return {
        setReg,
        getReg,
        addReg,
        setTownRef,
        getTown,
        setChosenTown,
        getChosenTown,
        getElemArray,
        filter,
        getTowns,
        regExists,
        countReg
    }
}