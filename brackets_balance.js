const TEST_VALUES = 'ad(ad{fa[df(f)fdf]df}fdf)';

const TYPE_OPEN_CHARACTERS_ALLOWED = ['{', '[', '('];
const TYPE_CLOSED_CHARACTERS_ALLOWED = ['}', ']', ')'];
let closedCharactersSaver = [];
let openCharactersSaver = [];
let temporalClosedSaver = [];

function doBracketsBalance(str = '') {

    for (let i = 0; i < str.length; i++) {
        const value = str[i];
        validateOpenBracket(value);
    }

    if (openCharactersSaver.length === closedCharactersSaver.length) {
        return true;
    }
    return false;
}

function validateOpenBracket(value) {

    const arrLength = temporalClosedSaver.length;
    let foundValue = false;

    if (arrLength) {
        foundValue = validateClosedBracket(value, temporalClosedSaver[arrLength - 1]);
        if (foundValue) return;
    } else {
        saveIfClosedCharacter(value);
    }

    if (!foundValue) {
        const index = TYPE_OPEN_CHARACTERS_ALLOWED.indexOf(value);
        if (index > -1) {
            openCharactersSaver.push(value);
            temporalClosedSaver.push(TYPE_CLOSED_CHARACTERS_ALLOWED[index]);
        }
    }
}

function validateClosedBracket(value, character) {
    if (value === character) {
        temporalClosedSaver.pop();
    }
    saveIfClosedCharacter(value);
}

function saveIfClosedCharacter(value) {
    const index = TYPE_CLOSED_CHARACTERS_ALLOWED.indexOf(value);
    if (index > -1) {
        closedCharactersSaver.push(value);
    }
}

console.log(doBracketsBalance(TEST_VALUES));