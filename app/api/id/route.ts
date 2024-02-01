import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
export async function GET(){
	try {
		const id = await generateNonExistingId();
		return NextResponse.json(id, {status: 200})
	} catch (error) {
		return NextResponse.json({status: 500})
	}
}


const generateNonExistingId = async () => {
	const id = uuid();
	const checkIfTierListExists = await prisma.tierList.findFirst({
		where: {
			id: id
		}
	})
	if(checkIfTierListExists){
		generateNonExistingId();
	} else {
		return id 
	}
}