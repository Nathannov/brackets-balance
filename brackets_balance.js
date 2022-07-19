const TYPE_OPEN_CHARACTERS_ALLOWED = ['{', '[', '('];
const TYPE_CLOSED_CHARACTERS_ALLOWED = ['}', ']', ')'];

let closedCharactersSaver = [];
let openCharactersSaver = [];
let temporalClosedSaver = [];

function saveIfClosedCharacter(value) {
    const index = TYPE_CLOSED_CHARACTERS_ALLOWED.indexOf(value);
    if (index > -1) {
        closedCharactersSaver.push(value);
    }
}

function validateClosedBracket(value, character) {
    if (value === character) {
        temporalClosedSaver.pop();
    }
    saveIfClosedCharacter(value);
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

function cleanValues() {
    closedCharactersSaver = [];
    openCharactersSaver = [];
    temporalClosedSaver = [];
}

function doBracketsBalance(str) {
    if(!str) return false;

    for (let i = 0; i < str.length; i++) {
        const value = str[i];
        validateOpenBracket(value);
    }

    if (openCharactersSaver.length === closedCharactersSaver.length) {
        cleanValues();
        return true;
    }

    cleanValues();
    return false;
}

console.log(doBracketsBalance('ad(ad{fa[df(f)fdf]df}fdf)'));
console.log(doBracketsBalance("function test ([a,b,c])=>[] ( )}"));
console.log(doBracketsBalance("function test ([a,b,c])=>{ ( )}"));