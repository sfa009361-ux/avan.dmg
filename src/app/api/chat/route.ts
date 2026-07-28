import { NextResponse } from "next/server";import { createClient } from "@supabase/supabase-js";
export const runtime = 'nodejs';


export async function POST(req: Request) {
 const supabase = createClient(  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
  try {
    const { message } = await req.json();

    const response = await fetch(
      "https://avanai.sfa009361.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );

    const data = await response.json();

    // اگر AI تشخیص داد مدیر باید پاسخ بده
    if (
      data.reply &&
      data.reply.toString().trim().toUpperCase() === "ADMIN"
    ) {
      const conversationId = crypto.randomUUID();

      const { error } = await supabase.from("chats").insert({
        message,
        sender: "user",
        answered: false,
        admin_reply: null,
        conversation_id: conversationId,
      });

      if (error) {
        console.error(error);
      }

      return NextResponse.json({  reply: "پیام شما ثبت شد ✅\nبه زودی توسط مدیر پاسخ داده خواهد شد.",
  conversationId,
});
    }

    // پاسخ عادی AI
    return NextResponse.json({
      reply: data.reply,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      reply: "خطا در ارتباط با سرور",
    });
  }
}