const RemoveElements = () => {
    let townReg
    let regCode

    const setTownReg = (reg) => {
        townReg = reg
    }

    const getTownReg = () => {
        return townReg
    }

    const setRegCode = (town) => {
        if(town == "Cape Town") {
            regCode = "CA"
        }else if(town == "Bellville"){
            regCode = "CJ"
        } else if(town == "Paarl") {
            regCode = "CY"
        } else if(town == 'All'){
            regCode = "All"
        }
    }

    const getRegCode = () => {
        return regCode
    }

    const removeElements = (appendParent, child) => {
        appendParent.removeChild(child)
    }

    const setError = (error) => {
        errorText = error
    }

    const getError = () => {
        return errorText
    }

    return {
        setTownReg,
        getTownReg,
        setRegCode,
        getRegCode,
        removeElements,
        setError,
        getError
    }
}