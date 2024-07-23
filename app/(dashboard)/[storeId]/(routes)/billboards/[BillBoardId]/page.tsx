import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({ params }: { params: { billboardId: string } }) => {
    console.log('Params:', params); // Debug log for params

    const { billboardId } = params;

    if (!billboardId) {
        console.error('Billboard ID is missing'); // Error log if ID is missing
        throw new Error('Billboard ID is required');
    }

    let billboard;
    try {
        billboard = await prismadb.billboard.findUnique({ 
            where: { id: billboardId }
        });
    } catch (error) {
        console.error('Error fetching billboard:', error); // Error log for Prisma query
        throw new Error('Failed to fetch billboard');
    }

    if (!billboard) {
        console.error('Billboard not found'); // Error log if billboard is not found
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
