"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullDateString = exports.dateMinusADay = void 0;
function dateMinusADay(date) {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}-${month}-${day}`;
}
exports.dateMinusADay = dateMinusADay;
function fullDateString(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}-${month}-${day}`;
}
exports.fullDateString = fullDateString;
//# sourceMappingURL=fullDate.js.map