import saveBeaches from './db/db';
import { getAllData } from './fetchers/fetchers';

(async () => {
  console.log('starting job')
  // const data = await getLatestData()
  const data = await getAllData()
  const s = await saveBeaches(data)
  console.log(s)
  process.exit()
})();