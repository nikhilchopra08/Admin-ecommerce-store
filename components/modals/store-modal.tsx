"use client"

import { useStoreModal } from "@/hooks/use-store-modal";
import { Model } from "../model";

export const StoreModal = () => {
    const storeModal = useStoreModal();

    return (
        <Model
            title="Create Store"
            description="Add new Store"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Add new store form
        </Model>
    );
};
