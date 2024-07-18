"use client"

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const SetUpPage = () => {

  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if(!isOpen){
      onOpen();
    }
  } , [onOpen , isOpen]);

  return (
    <div className=" p-14">
root
    </div>
  );
}

export default SetUpPage;