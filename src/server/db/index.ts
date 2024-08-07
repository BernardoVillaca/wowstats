import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import * as schema from './schema'
import { updateActivityStatistics } from '../actions/updateActivityStatistics';
import { updateShuffle } from '../actions/updateShuffle';
import { updateClassSpecCount } from '../actions/updateClassSpecCount';
import { updateLeaderboard } from '../actions/updateLeaderboard';
import { getExtraDataForEachPlayer } from '../actions/getExtraDataForEachPlayer';



export const db = drizzle(sql, { schema });

// let first = true;

// if (first) {

//     await updateLeaderboard('retail', 'us', '3v3')
//     first = false;
// }