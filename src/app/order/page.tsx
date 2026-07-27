"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function OrderPage() {
  const [loading, setLoading] = useState(false);

  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("طراحی سایت");
  const [budget, setBudget] = useState("کمتر از ۲۰ میلیون");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const trackingCode =
      "AVN-" + Date.now().toString().slice(-8);

    const { error } = await supabase.from("orders").insert([
      {
        fullname,
        phone,
        service,
        budget,
        description,
        file,

        tracking_code: trackingCode,

        status: "ثبت شده",

        payment_status: "pending",

        price: 0,

        download_url: null,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("ثبت سفارش با خطا مواجه شد.");
      console.error(error);
      return;
    }

    alert(`✅ سفارش شما ثبت شد

کد رهگیری شما:

${trackingCode}

این کد را ذخیره کنید.
بعداً با این کد می‌توانید وضعیت سفارش را مشاهده کنید.`);

    setFullname("");
    setPhone("");
    setService("طراحی سایت");
    setBudget("کمتر از ۲۰ میلیون");
    setDescription("");
    setFile("");
  }

  return (
  <main className="min-h-screen bg-[#f8f8f6] pt-32 pb-20">  <div className="mx-auto max-w-5xl px-8">

    <p className="text-sm uppercase tracking-[8px] text-gray-500">
      Order
    </p>

    <h1 className="mt-6 text-6xl font-black leading-tight">
      ثبت سفارش
    </h1>

    <p className="mt-8 max-w-2xl text-lg leading-9 text-gray-600">
      اطلاعات پروژه خود را وارد کنید تا تیم آوان در سریع‌ترین زمان با شما
      تماس بگیرد.
    </p>

    <div className="mt-16 rounded-[32px] bg-white p-10 shadow-xl">

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 md:grid-cols-2"
      >

        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="نام و نام خانوادگی"
          className="rounded-2xl border border-gray-200 p-4 outline-none focus:border-black"
          required
        />

        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="شماره تماس"
          className="rounded-2xl border border-gray-200 p-4 outline-none focus:border-black"
          required
        />

        <div className="md:col-span-2">
          <label className="mb-3 block font-semibold">
            نوع خدمات
          </label>

          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 p-4 outline-none focus:border-black"
          >
            <option>مشاوره رایگان</option>
            <option>طراحی سایت</option>
            <option>طراحی گرافیک</option>
            <option>برندینگ</option>
            <option>UI / UX</option>
            <option>سایر</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-3 block font-semibold">
            بودجه تقریبی
          </label>

          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 p-4 outline-none focus:border-black"
          >
            <option>مشاوره رایگان</option>
            <option>کمتر از ۲۰ میلیون</option>
            <option>۲۰ تا ۵۰ میلیون</option>
            <option>۵۰ تا ۱۰۰ میلیون</option>
            <option>بیشتر از ۱۰۰ میلیون</option>
          </select>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="توضیحات پروژه..."
          rows={6}
          className="rounded-2xl border border-gray-200 p-4 outline-none focus:border-black md:col-span-2"
          required
        />

        <div className="md:col-span-2">
          <label className="mb-3 block font-semibold">
            فایل ضمیمه (اختیاری)
          </label>

          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files?.[0]?.name || "")
            }
            className="w-full rounded-2xl border border-gray-200 p-4"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-black py-5 text-lg font-bold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "در حال ثبت..." : "ثبت درخواست"}
          </button>
        </div>

      </form>

    </div>

  </div>
</main>
);
}