import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params } : {params : {storeId :string}}
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name , value } = body; 

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("name is required", { status: 400});
        }

        if (!value) {
            return new NextResponse("value is required", { status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("store id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse("Unauthorised", { status: 403 });
        }

        const size = await prismadb.size.create({
            data : {
                name,
                value,
                storeId : params.storeId
            }
        })

        return NextResponse.json(size);

    } catch (err) {
        console.log(`[size_Post] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}

export async function GET(
    req: Request,
    { params } : {params : {storeId :string}}
) {
    try {
        
        if (!params.storeId) {
            return new NextResponse("store id is required", { status: 400 });
        }

        const sizes = await prismadb.size.findMany({
            where : {
                storeId : params.storeId
            }
        })

        return NextResponse.json(sizes);

    } catch (err) {
        console.log(`[sizes_GET] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}