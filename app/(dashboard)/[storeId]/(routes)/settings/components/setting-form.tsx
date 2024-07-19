"use client"

import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SettingsFormProps {
    initalData : Store
}

const formSchema = z.object({
    name : z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm : React.FC<SettingsFormProps> = ({
    initalData
}) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initalData,
    });

    const onSubmit = async (data : SettingsFormValues) => {
        console.log(data)
        try{
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data)
            toast.success("Store updated.")
            router.refresh();
        }
        catch(e){
            toast.error("something went wrong");
        }
        finally{
            setLoading(false);
        }
    }

    const onDelete = async (data : SettingsFormValues) => {
        console.log(data)
        try{
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`, data)
            router.refresh();
            router.push("/")
            toast.success("Store deleted.")
        }
        catch(e){
            toast.error("Make sure you removed all products and categories first.");
        }
        finally{
            setLoading(false)
            setOpen(false);
        }
    }
    return(
        <>
            <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
            />
            <div className="flex items-center justify-between">
                    <Heading title="Settings" description="Manage Store preferences" />
                    <Button variant="destructive" size="sm" onClick={() => setOpen(true)} disabled={loading}>
                    <Trash className="w-4 h-4" />
                </Button>
            </div>

            <Separator/>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField
                            control={form.control} 
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Store name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                    </div>
                    <Button disabled={loading} className='ml-auto' type='submit'>Save Changes</Button>
                </form>
            </Form>

            <Separator/>
            <ApiAlert 
            title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/${params.storeId}`}
                variant='public'/>
        </>
    );
}