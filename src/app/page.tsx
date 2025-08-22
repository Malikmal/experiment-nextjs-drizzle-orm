"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactRequest, contactSchema } from "@/apimodels/contact-request";

export default function Home() {
  const form = useForm<ContactRequest>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "", // "name 001",
      email: "", // "email-001@gmail.com",
      subject: "", // "Quotation of blablabla",
      message: "", // "message",
    },
  });

  async function handleSubmit(data: ContactRequest) {
    console.log({ data });

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 201) {
      const errorData = await response.json();
      toast.error(`Failed to send message: ${errorData.message}`);
      console.log("Error:", errorData);
      return;
    }

    toast.success("Message sent successfully!");
    form.reset();
  }

  return (
    <main className="h-screen w-screen grid place-items-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground">We'd love to hear from you!</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Subject" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write your message here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="col-span-full"
              >
                {form.formState.isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <ToastContainer />
    </main>
  );
}
