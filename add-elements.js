const AddElements = () => {
    let regNum
    let createdElem
    let appendParent
    let regNames = []
    let elemArray = []
    let errorText 

    //set and get reg numbers
    const setReg = (num) => {
        regNum = num.toUpperCase().replace(/ /g, '')
    }

    const getReg = () => {
        return regNum
    }

    //set element 
    

    //set and get array of existing elements before removal
    const setElemArray = (elem) => {
        elemArray.push(elem)
    }

    const getElemArray = () => {
        return elemArray
    }

    //set and get array of registration numbers entered by user
    const setRegArray = (regNums) => {
        regNames = regNums
        regNames.push(regNum)
    }

    const getRegArray = () => {
        return regNames
    }

    const setError = (error) => {
        errorText = error
    }

    const getError = () => {
        return errorText
    }

    return {
        setReg,
        getReg,
        setElemArray,
        getElemArray,
        setRegArray,
        getRegArray,
        setError,
        getError
    }
}