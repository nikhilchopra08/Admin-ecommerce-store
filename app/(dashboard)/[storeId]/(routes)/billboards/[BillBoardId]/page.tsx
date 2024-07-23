import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({ params }: { params: { billboardId: string } }) => {
    const { billboardId } = params;

    if (!billboardId) {
        throw new Error('Billboard ID is missing');
    }

    const billboard = await prismadb.billboard.findUnique({ 
        where: { id: billboardId }
    });

    if (!billboard) {
        throw new Error('Billboard not found');
    }

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    );
};

export default BillboardPage;
