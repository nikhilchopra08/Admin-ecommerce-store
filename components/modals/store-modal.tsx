"use client"

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z.string().min(1)
})


export const StoreModal = () => {
    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          name: ""
      }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  }

    return (
        <Modal
            title="Create Store"
            description="Add new Store"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Add new store form
            <div>
                <div className='py-2 pb-4 space-y-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='E-commerce'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex items-center justify-end w-full pt-6 space-x-2'>
                                <Button
                                    variant="outline"
                                    onClick={storeModal.onClose}>Cancel</Button>
                                <Button type='submit' >Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>

    );
};
