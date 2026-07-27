"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: string;
  fullname: string;
  phone: string;
  service: string;
  budget: string;
  description: string;
  status: string;
  created_at: string;
  price: number;payment_link: string | null;
download_url: string | null;
};

type Chat = {
  id: string;
  message: string;
  admin_reply: string | null;
  answered: boolean;
  created_at: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [reply, setReply] = useState("");

  useEffect(() => {
    getOrders();
    getChats();
  }, []);

  async function getOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setOrders(data as Order[]);
  }

  async function getChats() {
    const { data } = await supabase
      .from("chats")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setChats(data as Chat[]);
  }

 async function updateStatus(id: string, status: string, price?: number) {
  await supabase
    .from("orders")
    .update({
      status,
      price,
    })
    .eq("id", id);

  getOrders();
}

async function savePrice(id: string) {
  const price = Number(
    (
      document.getElementById(
        `price-${id}`
      ) as HTMLInputElement
    ).value
  );

  await supabase
    .from("orders")
    .update({ price })
    .eq("id", id);

  getOrders();
}

  async function sendReply(id: string) {
    if (!reply.trim()) return;

    await supabase
      .from("chats")
      .update({
        admin_reply: reply,
        answered: true,
      })
      .eq("id", id);

    setReply("");
    getChats();
  }
async function deleteChat(id: string) {  const { error } = await supabase
    .from("chats")
    .delete()
    .eq("id", id);

  console.log("DELETE ERROR:", error);

  getChats();
  
}
  return (
    <main className="min-h-screen bg-[#f8f8f6] p-10">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-10 text-5xl font-black">
          سفارش‌ها
        </h1>

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="rounded-3xl bg-white p-8 shadow-xl"
            >

            <div className="flex items-center justify-between">

  <div>
    <h2 className="text-2xl font-bold">
      {order.fullname}
    </h2>

    <p className="mt-2 text-gray-500">
      {order.phone}
    </p>
  </div>

  <div className="flex items-center gap-3">

    <input
    
      type="number"
      placeholder="مبلغ"
      defaultValue={order.price || ""}
      id={`price-${order.id}`}
      className="w-40 rounded-xl border p-3"
    
    />
<button
  onClick={() => savePrice(order.id)}
  className="rounded-xl bg-black px-4 py-3 text-white"
>
  ذخیره مبلغ
</button>
    <select
      value={order.status || "جدید"}
      onChange={(e) =>
        updateStatus(
          order.id,
          e.target.value,
          Number(
            (
              document.getElementById(
                `price-${order.id}`
              ) as HTMLInputElement
            ).value
          )
        )
      }
      className="rounded-xl border p-3"
    >
      <option>جدید</option>
      <option>درحال بررسی</option>
      <option>پرداخت اولیه</option>
      <option>درحال انجام</option>
      <option>تحویل داده شد</option>
    </select>

  </div>

</div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">

                <div>

                  <p className="text-gray-500">
                    خدمت
                  </p>

                  <h3 className="font-bold">
                    {order.service}
                  </h3>

                </div>

                <div>

                  <p className="text-gray-500">
                    بودجه
                  </p>

                  <h3 className="font-bold">
                    {order.budget}
                  </h3>

                </div>

              </div>

              <div className="mt-8">

                <p className="mb-2 text-gray-500">
                  توضیحات پروژه
                </p>

                <p className="leading-8">
                  {order.description}
                </p>

              </div>

            </div>

          ))}

        </div>
        <div className="mt-20">
          <h2 className="mb-8 text-5xl font-black">
            پیام‌های چت
          </h2>

          <div className="space-y-8">

            {chats.length === 0 && (

              <div className="rounded-3xl bg-white p-8 text-center shadow-xl">

                هیچ پیام جدیدی وجود ندارد.

              </div>

            )}

            {chats.map((chat) => (

              <div
                key={chat.id}
                className="rounded-3xl bg-white p-8 shadow-xl"
              >

                <div className="mb-5 flex items-center justify-between">

                  <h3 className="text-xl font-bold">

                    پیام مشتری

                  </h3>

                  <span
                    className={`rounded-full px-4 py-2 text-sm ${
                      chat.answered
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >

                    {chat.answered ? "پاسخ داده شده" : "در انتظار پاسخ"}

                  </span>

                </div>

                <div className="rounded-2xl bg-[#f7f7f7] p-5 leading-8">

                  {chat.message}

                </div>

                {chat.answered ? (

                  <div className="mt-6 rounded-2xl bg-green-100 p-5">

                    <p className="mb-2 font-bold">

                      پاسخ مدیر

                    </p>

                    <p className="leading-8">

                      {chat.admin_reply}

                    </p>

                  </div>

                ) : (

                  <div className="mt-6">

                    <textarea
                      rows={5}
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="پاسخ مدیر..."
                      className="w-full rounded-2xl border border-gray-300 p-5 outline-none"
                    />

                    <button
                      onClick={() => sendReply(chat.id)}
                      className="mt-5 rounded-2xl bg-black px-8 py-4 text-white transition hover:opacity-90"
                    >

                      ارسال پاسخ


                    </button>
<button  onClick={() => {
    alert(chat.id);
    deleteChat(chat.id);
  }}
  className="mt-4 rounded-2xl bg-red-600 px-6 py-3 text-white hover:bg-red-700"
>
  حذف پیام
</button>
                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>

  );
}
