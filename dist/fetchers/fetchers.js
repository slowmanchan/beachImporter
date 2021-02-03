"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllData = exports.getLatestData = void 0;
const got_1 = __importDefault(require("got"));
const fullDate_1 = require("../utils/fullDate");
const beachURL = 'https://secure.toronto.ca/opendata/adv';
function getLatestData() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${beachURL}/last_update/v1?format=json`;
        const response = yield got_1.default(url);
        const lastUpdate = response.body;
        const date = fullDate_1.dateMinusADay(lastUpdate.split(' ')[0]);
        const urlTwo = `${beachURL}/beach_results/v1?format=json&startDate=${date}&endDate=${date}`;
        const res = yield got_1.default(urlTwo);
        return res.body;
    });
}
exports.getLatestData = getLatestData;
function getAllData() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${beachURL}/beach_results/v1?format=json&startDate=1900-01-01&endDate=${fullDate_1.fullDateString(new Date().toString())}`;
        const res = yield got_1.default(url);
        return res.body;
    });
}
exports.getAllData = getAllData;
//# sourceMappingURL=fetchers.js.map