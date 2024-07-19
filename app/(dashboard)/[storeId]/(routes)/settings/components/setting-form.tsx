"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initalData,
    });

    const onSubmit = async (data : SettingsFormValues) => {
        console.log(data)
        try{
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh();
            router.push("/")
            toast.success("Store deleted.")
        }
        catch(e){
            toast.error("something went wrong");
        }
        finally{
            setLoading(false);
        }
    }
    return(
        <>
            <div className="flex items-center justify-between">
                    <Heading title="Settings" description="Manage Store preferences" />
                    <Button disabled={loading} variant="destructive" size="sm" onClick={() => {}} >
                        <Trash className="size-4 "/>
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
        </>
    );
}