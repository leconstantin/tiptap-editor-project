"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import TipTap from "@/components/TipTap";

const formSchema = z.object({
  title: z.string().min(5, { message: "hey title is not to long enough" }),
  price: z.number().min(5, { message: "Not long number" }),
  description: z
    .string()
    .min(5, { message: "The description is not long" })
    .max(5000, { message: "It's too long" }),
});

type TformSchema = z.infer<typeof formSchema>;

export default function Home() {
  const form = useForm<TformSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      price: 29.99,
      description: "",
    },
  });
  const onSubmit = (data: TformSchema) => {};
  return (
    <main className="p-24">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Main title for your form" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <TipTap description={field.name} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}
