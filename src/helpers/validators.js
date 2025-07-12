/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {compose, equals, filter, prop, values, length, allPass, anyPass} from "ramda";


const isRed = equals('red');
const isBlue = equals('blue');
const isOrange = equals('orange');
const isGreen = equals('green');
const isWhite = equals('white');

const getTriangle = prop('triangle')
const getSquare = prop('square')
const getCircle = prop('circle')
const getStar = prop('star')

const isNotWhite = (color) => color !== 'white'
const isNotRed = (color) => color !== 'red'

const countColor = (color) =>
    compose(
        length,
        filter(equals(color)),
        values
    );

const countRedColor = countColor('red');
const countBlueColor = countColor('blue');
const countOrangeColor = countColor('orange');
const countGreenColor = countColor('green');

const isCountAtLeast2 = (count) => count >= 2
const isCountAtLeast3 = (count) => count >= 3

// 1. Красная звезда, зеленый квадрат, все остальные белые.
// export const validateFieldN1 = ({star, square, triangle, circle}) => {
//     if (triangle !== 'white' || circle !== 'white') {
//         return false;
//     }
//
//     return star === 'red' && square === 'green';
// };

export const validateFieldN1 = (items) =>
    allPass([
        compose(isRed, getStar),
        compose(isGreen, getSquare),
        compose(isWhite, getCircle),
        compose(isWhite, getTriangle),
    ])(items);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (items) =>
    compose(
        isCountAtLeast2,
        countGreenColor
    )(items);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (items) =>
    equals(
        countRedColor(items),
        countBlueColor(items)
);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = (items) =>
    allPass([
        compose(isBlue, getCircle),
        compose(isRed, getStar),
        compose(isOrange, getSquare),
    ])(items);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (items) =>
    anyPass([
        compose(isCountAtLeast3, countRedColor),
        compose(isCountAtLeast3, countBlueColor),
        compose(isCountAtLeast3, countOrangeColor),
        compose(isCountAtLeast3, countGreenColor),
    ])(items);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (items) =>
    allPass([
        compose(equals(2), countGreenColor),
        compose(isGreen, getTriangle),
        compose(equals(1), countRedColor),
    ])(items)

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (items) =>
    compose(
        equals(4),
        countOrangeColor
    )(items);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = (items) =>
    allPass([
        compose(isNotWhite, getStar),
        compose(isNotRed, getStar),
    ])(items)


// 9. Все фигуры зеленые.
export const validateFieldN9 = (items) =>
    compose(
        equals(4),
        countGreenColor
    )(items);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (items) =>
    allPass([
        (items) => getTriangle(items) === getSquare(items),
        compose(isNotWhite, getTriangle),
        compose(isNotWhite, getSquare),
    ])(items)
