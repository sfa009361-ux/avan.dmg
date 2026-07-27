"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TrackingPage() {
  const [code, setCode] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function searchOrder() {
    if (!code.trim()) return;

    setLoading(true);

    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("tracking_code", code)
      .single();

    setOrder(data);

    setLoading(false);
  }

  const steps = [
    "ثبت شده",
    "درحال بررسی",
    "پرداخت اولیه",
    "درحال طراحی",
    "بازبینی",
    "آماده تحویل",
    "پایان پروژه",
  ];

  const currentStep = order?.status
    ? steps.indexOf(order.status)
    : -1;

  return (
  <main className="min-h-screen bg-[#f8f8f6] pt-40 pb-24">
    <div className="mx-auto max-w-3xl">
      <h1 className="text-center text-5xl font-black">
        پیگیری سفارش
      </h1>

      <p className="mt-6 text-center text-gray-500">
        کد رهگیری خود را وارد کنید
      </p>

      <div className="mt-12 flex gap-4">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="AVN-12345678"
          className="flex-1 rounded-2xl border p-5"
        />

        <button
          onClick={searchOrder}
          className="rounded-2xl bg-black px-10 text-white"
        >
          {loading ? "..." : "جستجو"}
        </button>
      </div>

      {order && (
        <div className="mt-16 rounded-3xl bg-white p-10 shadow-xl">
          <h2 className="text-3xl font-black">
            {order.fullname}
          </h2>

          <div className="mt-10 space-y-5">
            <p>
              <strong>کد رهگیری:</strong>{" "}
              {order.tracking_code}
            </p>

            <p>
              <strong>خدمت:</strong>{" "}
              {order.service}
            </p>

            <p>
              <strong>بودجه:</strong>{" "}
              {order.budget}
            </p>

            <div className="mt-12">
              <h3 className="mb-8 text-2xl font-bold">
                وضعیت سفارش
              </h3>

              <div className="space-y-5">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-5"
                  >
                    <div
                      className={`h-5 w-5 rounded-full ${
                        index < currentStep
                          ? "bg-green-500"
                          : index === currentStep
                          ? "bg-[#c89b63]"
                          : "bg-gray-300"
                      }`}
                    />

                    <p
                      className={`text-lg ${
                        index <= currentStep
                          ? "font-bold text-black"
                          : "text-gray-400"
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          {order.status === "پرداخت اولیه" && (
  <div className="mt-10 rounded-2xl border border-green-300 bg-green-50 p-6">
    <h3 className="text-xl font-bold">
      پرداخت اولیه
    </h3>

    <p className="mt-4">
      مبلغ قابل پرداخت:
      <strong>
        {" "}
        {Number(order.price).toLocaleString("fa-IR")} تومان
      </strong>
    </p>

    <button className="mt-6 rounded-xl bg-black px-6 py-3 text-white">
      پرداخت
    </button>
  </div>
)}
          </div>
        </div>
      )}
    </div>
  </main>
);
}