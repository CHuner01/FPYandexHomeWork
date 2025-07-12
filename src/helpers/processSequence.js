/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
 import Api from '../tools/api';
import {allPass, compose, match, tap, length, prop} from "ramda";

 const api = new Api();

const getBinary = (number) => api.get('https://api.tech/numbers/base', {
    from: 10,
    to: 2,
    number,
});
const getAnimal = (id) => api.get(`https://animals.tech/${id}`);

const roundNum = compose(Math.round, Number)

const validateValue = (val) => allPass([
    compose((count) => count < 10, length),
    compose((count) => count > 2, length),
    (val) => Number(val) > 0,
    compose(Boolean, match(/^\d+(\.\d+)?$/))
])(val)

const logValue = (writeLog) => tap(writeLog);

const logLength = (writeLog) => (str) => {
    const len = str.length;
    writeLog(len);
    return len;
};

const logSquared = (writeLog) => (num) => {
    const sq = num ** 2;
    writeLog(sq);
    return sq;
};

const logRemainder = (writeLog) => (num) => {
    const rem = num % 3;
    writeLog(rem);
    return rem;
};


const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    writeLog(value);

    if (!validateValue(value)) {
        handleError('ValidationError');
        return;
    }

    const rounded = roundNum(value);
    writeLog(rounded);

    return getBinary(rounded)
        .then(prop('result'))
        .then(logValue(writeLog))
        .then(logLength(writeLog))
        .then(logSquared(writeLog))
        .then(logRemainder(writeLog))
        .then(getAnimal)
        .then(prop('result'))
        .then(handleSuccess)
        .catch(handleError);
};



export default processSequence;
