export default class RegexTest {
    static containsUppercase = (value) => /[A-Z]/.test(value);
    static containsLowercase = (value) => /[a-z]/.test(value);
    static containsSpecialCharacter = (value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value);
    static containsDigit = (value) => /\d/.test(value);
    static startsWithUpperCase = (value) => /^[A-Z]/.test(value);
    static fixedLengthNumber = (value, length) => new RegExp(`^\\d{${length}}$`).test(value);
    static onlyNumbers = (value) => /^[0-9]+$/.test(value);
    static isInteger = (value) => /^(?:[0-9])*?$/.test(value);
    static isValidCNPorCUI = (value) => /^RO\d*$|^\d+$/.test(value);
    static isFloatBetweenZeroAndHundred = (value) => /^(100(?:\.0{1,2})?|\d{0,2}(?:\.\d{0,2})?)$/.test(value)
    static romanianPostalCode = (value) => /^\d{6}$/.test(value)
    static email = (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)

}
