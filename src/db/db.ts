import { Pool } from 'pg';

const getBeachesFromDB = async () => {
  const pool = new Pool()
  const res = await pool.query('SELECT * FROM beach_water_quality')
  await pool.end()
  return res.rows
}

const saveBeaches = async (data: string) => {
  const pool = new Pool()
 
  const parsedDataArray = JSON.parse(data)
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
  }

  const res = await pool.query(query).catch(e => console.error(e.stack));
  const jobID = res.rows[0].id;

  return Promise.all(parsedDataArray.map((a) => {
    if (!a.data) {
      return;
    }
    return Promise.all(a.data.map((d) => {
      const beachWaterQualityQuery = {
        text: `
          INSERT INTO beach_water_quality(beach_water_job_id, beach_info_id, e_coli, advisory, status_flag, collection_date)
               VALUES ($1,$2,$3,$4,$5,$6)
        `,
        values: [jobID, d.beachId, d.eColi, d.advisory, d.statusFlag, a.CollectionDate],
      }
      return pool.query(beachWaterQualityQuery).catch(e => console.error(e.stack))
    }))
  }))
}

export default saveBeaches