import { ContactRequest, contactSchema } from "@/apimodels/contact-request";
import { db } from "@/db/db";
import { messages } from "@/db/schema";

export async function GET() {
  const data = await db.query.messages.findMany();
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  const data: ContactRequest = await request.json();

  contactSchema.parse(data);

  const message = await db.insert(messages).values({
    id: crypto.randomUUID(),
    name: data.name,
    subject: data.subject,
    email: data.email,
    message: data.message,
    created_at: new Date(),
  });

  return new Response(JSON.stringify(message), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
