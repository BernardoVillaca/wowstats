import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import * as schema from './schema'
import { updateActivityStatistics } from '../actions/updateActivityStatistics';
import { updateShuffleActivityStatistics } from '../actions/updateShuffleActivityStatistics';
import { updateShuffle } from '../actions/updateShuffle';



export const db = drizzle(sql, { schema });

let first = true;

if(first) {
    await updateShuffle('us', 3);
    // await updateShuffleActivityStatistics();
    first = false;
}