export const getNextId = () => {
    return new Date().getTime()
}
export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
export const checkExists = (newValue: string, existingValuesArr: string[]): boolean => {
    let isExist = false
    existingValuesArr.forEach(value => {
        if (value.toUpperCase() === newValue.toUpperCase()) {
            isExist = true
            return
        }
    })
    return isExist
}
export const validateText = (newValue: string, setError: (newValue:string) => void, existingValuesArr: string[], newValueMinLength: number) => {
    setError("")
    const newValueNumberLetters = newValue.match(/[a-zA-Zа-яА-Я]/g)
    if (!newValueNumberLetters) {
        setError("Поле должно содержать буквы")
    } else {
        if (newValueNumberLetters.length < newValueMinLength) {
            setError(`Поле должно содержать не меньше ${newValueMinLength} букв`)
        } else {
            if (checkExists(newValue, existingValuesArr)) {
                setError("Такое значение уже существует")
            }
        }
    }
}