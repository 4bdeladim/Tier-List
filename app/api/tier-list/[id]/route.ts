import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export async function POST(req:NextApiRequest, res:NextApiResponse){
	try {
		const { img, tierListId, rowId } = await req.body;
		const { id } = req.query 
		if(!tierListId) res.status(404).json("No tier list found")
		const tierList = await prisma.tierList.findUnique({
			where: {
				id: tierListId
			}
		})
		
	} catch (error) {
		
	}
}

export async function GET(){
	
}