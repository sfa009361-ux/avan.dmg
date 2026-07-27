"use client";
import Link from "next/link";

export default function OrderCTA() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-8">

        <div className="rounded-[40px] bg-black px-10 py-24 text-center text-white">

          <p className="mb-4 text-sm uppercase tracking-[8px] text-gray-400">
            AVAN dmg
          </p>

          <h2 className="mx-auto max-w-3xl text-5xl font-black leading-tight">
            آماده‌ای پروژه بعدی برندت
            <br />
            متفاوت باشد؟
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-gray-300">
            از طراحی سایت تا برندینگ و تولید محتوا، تیم آوان کنار شماست تا
            حضوری حرفه‌ای و ماندگار در فضای دیجیتال بسازید.
          </p>

          <Link href="/order">
            <button className="mt-12 rounded-full bg-white px-10 py-4 font-bold text-black transition duration-300 hover:scale-105">
              ثبت سفارش
            </button>
          </Link>

        </div>

      </div>
    </section>
  );
}