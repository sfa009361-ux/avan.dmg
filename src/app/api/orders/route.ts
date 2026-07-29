import { NextResponse } from "next/server";import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await req.json();

    const trackingCode =
      "AVN-" +
      Math.random().toString(36).substring(2, 8).toUpperCase();

    const { data, error } = await supabase
      .from("orders")
      .insert({
        fullname: body.fullname,
        phone: body.phone,
        service: body.service,
        budget: body.budget,
        description: body.description,
        file: body.file,
        status: "ثبت شده",
        tracking_code: trackingCode,
      })
      .select()
      .single();

    if (error) {
      console.error(error);

      return NextResponse.json(
        { success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      trackingCode,
      order: data,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}