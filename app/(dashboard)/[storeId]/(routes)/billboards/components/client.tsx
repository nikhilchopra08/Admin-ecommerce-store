"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BillboardColumn, columns } from "./columns"
import { ApiList } from "@/components/ui/api-list"
import { DataTable } from "./data-table"
// import { ApiList } from "@/components/ui/api-list"

interface BillboardClientProps {
    data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboard`}
                    description="BillBoard Info"/>
                {/* <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button> */}
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="label" />
            <Heading title="API" description="API calls for Billboards" />
            <Separator />
            <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
    )
}