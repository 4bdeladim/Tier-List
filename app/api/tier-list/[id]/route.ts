import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { tierList }: { tierList: TierList } = await req.json();
        if (!tierList)
            return NextResponse.json("No tier list given", { status: 404 });
        const checkIfTierListExists = await prisma.tierList.findFirst({
            where: {
                id: tierList.id,
            },
        });
        if (!checkIfTierListExists) {
            await prisma.tierList.create({
                data: {
                    id: tierList.id,
                },
            });
            for (const row of tierList.rows || []) {
                const createdRow = await prisma.tierListRow.create({
                    data: {
                        id: row.id,
                        bg: row.bg,
                        tierListId: tierList.id,
                    },
                });
                for (const item of row.items || []) {
                    await prisma.tierListItem.create({
                        data: {
                            id: item.id,
                            img: item.img,
                            rowId: createdRow.id,
                        },
                    });
                }
            }
        }

        return NextResponse.json("Tierlist saved", { status: 200 });
    } catch (error) {
        return NextResponse.json("Server error", { status: 500 });
    }
}

export async function GET() {}
