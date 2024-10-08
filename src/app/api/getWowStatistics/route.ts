import { desc } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { db } from "~/server/db";
import { activityStatistics, classSpecStatistics } from "~/server/db/schema";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const history = url.searchParams.get('history') === 'true';

    try {
        if (history) {
            const activityHistory = await db
                .select()
                .from(activityStatistics)
                .orderBy(desc(activityStatistics.id))
                .limit(40);

            return NextResponse.json({ activityHistory });
        }

        const response = await db.select().from(classSpecStatistics).orderBy(desc(classSpecStatistics.id)).limit(1);
        const classSpecData = response[0]

        const secondResponse = await db.select().from(activityStatistics).orderBy(desc(activityStatistics.id)).limit(1);
        const activityData = secondResponse[0]



        return NextResponse.json({ classSpecData, activityData });
    } catch (error) {
        console.error('Error fetching realms:', error);
        return NextResponse.json({ error: 'Failed to fetch realms' }, { status: 500 });
    }
}
