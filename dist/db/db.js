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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const getBeachesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = new pg_1.Pool();
    const res = yield pool.query('SELECT * FROM beach_water_quality');
    yield pool.end();
    return res.rows;
});
const saveBeaches = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = new pg_1.Pool();
    const parsedDataArray = JSON.parse(data);
    // const jobCheckQuery = `SELECT last_collection_date::date::text from beach_water_jobs ORDER BY id DESC LIMIT 1;`
    // const { rows } = await pool.query(jobCheckQuery);
    // const lastCollectionDate = rows[0].last_collection_date
    // if (lastCollectionDate === parsedData.CollectionDate) {
    //   console.log('no new collections')
    //   return
    // }
    const query = {
        text: `
      INSERT INTO beach_water_jobs(last_collection_date)
           VALUES ($1)
        RETURNING id
    `,
        values: [new Date()]
    };
    const res = yield pool.query(query).catch(e => console.error(e.stack));
    const jobID = res.rows[0].id;
    return Promise.all(parsedDataArray.map((a) => {
        if (!a.data) {
            return;
        }
        return a.data.map((d) => {
            const beachWaterQualityQuery = {
                text: `
          INSERT INTO beach_water_quality(beach_water_job_id, beach_info_id, e_coli, advisory, status_flag, collection_date)
               VALUES ($1,$2,$3,$4,$5,$6)
        `,
                values: [jobID, d.beachId, d.eColi, d.advisory, d.statusFlag, a.CollectionDate],
            };
            return pool.query(beachWaterQualityQuery).catch(e => console.error(e.stack));
        });
    }));
});
exports.default = saveBeaches;
//# sourceMappingURL=db.js.map