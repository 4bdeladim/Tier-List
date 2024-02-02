import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { tierList }: { tierList: TierList } = await req.body;
        if (!tierList)
            return NextResponse.json("No tier list given", { status: 404 });

        await prisma.tierList.create({
            data: {
                id: tierList.id,
            },
        });

        for (const row of tierList.rows || []) {
            await prisma.tierListRow.create({
                data: {
                    id: row.id,
                    bg: row.bg,
                    tierListId: tierList.id,
                    items: {
                        createMany: {
                            data: row.items.map((item: DroppableItem) => ({
                                id: item.id,
                                img: item.img,
                                rowId: row.id,
                            })),
                        },
                    },
                },
            });
        }

        res.status(200).json({ message: "Tier list created successfully" });
    } catch (error) {
        console.error("Error creating tier list:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function GET() {

}
