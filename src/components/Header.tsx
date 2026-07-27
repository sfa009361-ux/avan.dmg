"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";

const modalContent = {
  "خدمات": {
    title: "خدمات آوان",
    text: `آوان ارائه‌دهنده خدمات تخصصی در حوزه طراحی و توسعه دیجیتال است.

• طراحی و توسعه وب‌سایت
• طراحی رابط و تجربه کاربری (UI/UX)
• طراحی لوگو و هویت بصری
• طراحی گرافیک
• تولید محتوای دیجیتال
• ارائه راهکارهای اختصاصی متناسب با نیاز کسب‌وکارها

تمامی سفارش‌ها پس از بررسی اولیه، برآورد هزینه و تأیید نهایی مشتری وارد مرحله اجرا می‌شوند.`
  },

  "نمونه کارها": {
    title: "نمونه کارهای آوان",
    text: `نمونه‌کارهای ارائه‌شده در این بخش، بخشی از پروژه‌های انجام‌شده توسط آوان در حوزه طراحی وب، رابط کاربری، طراحی گرافیک و برندینگ است.

هدف از نمایش این پروژه‌ها، آشنایی کاربران با کیفیت خدمات، سبک طراحی و توانمندی‌های مجموعه می‌باشد.`
  },

  "فرآیند همکاری": {
    title: "فرآیند همکاری",
    text: `۱. ثبت درخواست توسط مشتری
۲. بررسی نیازها و اعلام هزینه
۳. تأیید سفارش و پرداخت اولیه
۴. شروع طراحی و اجرای پروژه
۵. بازبینی و اعمال اصلاحات توافق‌شده
۶. تحویل فایل نهایی پس از تسویه حساب

کاربران می‌توانند در تمام مراحل از طریق بخش «پیگیری سفارش» وضعیت پروژه خود را مشاهده کنند.`
  },

  "درباره ما": {
    title: "درباره آوان",
    text: `آوان یک مجموعه فعال در زمینه طراحی و توسعه خدمات دیجیتال است.

ما با تمرکز بر کیفیت، شفافیت در همکاری و ارائه خدمات حرفه‌ای، در زمینه طراحی وب‌سایت، طراحی رابط کاربری، طراحی لوگو، هویت بصری و راهکارهای دیجیتال فعالیت می‌کنیم.

هدف ما ایجاد تجربه‌ای مطمئن، حرفه‌ای و رضایت‌بخش برای تمامی مشتریان است.`
  },

  "حریم خصوصی": {
    title: "حریم خصوصی",
    text: `حفظ حریم خصوصی کاربران یکی از اصول اصلی آوان است.

تمامی اطلاعات ثبت‌شده از جمله نام، شماره تماس، فایل‌های ارسالی و اطلاعات سفارش، صرفاً جهت ارائه خدمات و ارتباط با مشتری استفاده می‌شود.

اطلاعات کاربران بدون رضایت آن‌ها در اختیار اشخاص یا سازمان‌های ثالث قرار نخواهد گرفت؛ مگر در مواردی که مطابق قوانین و مقررات کشور یا با دستور مراجع ذی‌صلاح الزامی باشد.

ثبت سفارش در سایت به منزله پذیرش قوانین و مقررات آوان خواهد بود.`
  },

  "تماس": {
  title: "ارتباط با آوان",
  text: "شماره تماس:\n‎+98 920 550 2464‎\n\nساعات پاسخگویی:\nهمه‌روزه از ساعت 12:00 تا 22:00\n\nپشتیبانی سفارش‌ها از طریق بخش «پیگیری سفارش» سایت نیز در دسترس است."
}
};
const navItems = [
  { title: "خانه", href: "#" },
  { title: "خدمات", href: "#services", modal: false },
  { title: "نمونه کارها", href: "#portfolio", modal: false },
  { title: "فرآیند همکاری", modal: true },
  { title: "درباره ما", modal: true },
  { title: "حریم خصوصی", modal: true },
  { title: "تماس", modal: true },
];
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);

    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-5 z-50">

      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .8 }}
        className={`mx-auto flex h-[82px] max-w-[1560px] items-center justify-between rounded-[28px] border transition-all duration-500 ${
          scrolled
            ? "border-white/20 bg-[#0f0f11]/80 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-3xl"
            : "border-[#2b2b2d] bg-[#111214]/90 backdrop-blur-2xl"
        }`}
      >

        <div className="flex items-center gap-10 pr-8">
          <Link href="/" className="flex items-center gap-4">

            <div className="flex h-17 w-17 items-center justify-center rounded-2xl border border-[#c89b63]/30 bg-[#18191b]">

              <img
                src="/logo.png"
                alt="AVAN"
                className="h-15 w-15 object-contain"
              />

            </div>

            <h2 className="text-3xl font-black tracking-[4px] text-white">
              آوان
            </h2>

          </Link>
        </div>
<nav className="hidden items-center gap-10 lg:flex">

  {navItems.map((item) => (

    item.modal ? (

      <button
        key={item.title}
        onClick={() => setActiveModal(item.title)}
        className="group relative bg-transparent border-none p-0 text-sm text-white/85 transition duration-300 hover:text-[#d8b07b]"
      >
        {item.title}

        <span className="absolute -bottom-3 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#d8b07b] transition-all duration-300 group-hover:w-full" />

      </button>

    ) : (

      <a
        key={item.title}
        href={item.href}
        className="group relative text-sm text-white/85 transition duration-300 hover:text-[#d8b07b]"
      >
        {item.title}

        <span className="absolute -bottom-3 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#d8b07b] transition-all duration-300 group-hover:w-full" />

      </a>

    )

  ))}

</nav>
               <div className="flex items-center gap-6 pl-8">

          <Link href="/order">

            <button className="group flex items-center gap-3 rounded-2xl bg-[#d7b07b] px-7 py-4 text-sm font-bold text-black transition-all duration-500 hover:scale-105 hover:shadow-[0_15px_40px_rgba(215,176,123,.35)]">

              <ArrowRight
                size={18}
                className="transition duration-500 group-hover:-translate-x-1"
              />

              درخواست مشاوره رایگان

            </button>

          </Link>

        </div>

      </motion.div>

<div className="fixed right-6 top-1/2 -translate-y-1/2 z-[60]">
  <Link href="/tracking">
  <button
  className="flex items-center justify-center rounded-3xl border-2 border-[#d7b07b] bg-[#111214] px-8 py-5 text-base font-bold !text-[#d7b07b] transition-all duration-300 hover:scale-105 hover:bg-[#d7b07b] hover:!text-black"
>
  <span className="!text-[#d7b07b]">پیگیری سفارش</span>
</button>
</Link>

</div>

<AnimatePresence>

        {activeModal && modalContent[activeModal as keyof typeof modalContent] && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center pt-40 bg-black/70 backdrop-blur-md"
          >

            <motion.div
              initial={{ scale: .85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: .85, opacity: 0, y: 40 }}
              transition={{ duration: .35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative overflow-visible mx-5 w-full max-w-xl rounded-[32px] border border-white/10 bg-[#111214] p-10 shadow-[0_30px_100px_rgba(0,0,0,.6)]"
            >

             <button
  onClick={() => setActiveModal(null)}
  className="absolute top-4 start-4 z-[9999] flex h-11 w-11 items-center justify-center rounded-full bg-[#d7b07b] text-black shadow-lg transition hover:scale-110"
>
  ✕
</button>

              <h2 className="mb-6 text-3xl font-black text-white">
                {modalContent[activeModal as keyof typeof modalContent].title}
              </h2>


              <p className="whitespace-pre-line leading-9 text-white/70">
                {modalContent[activeModal as keyof typeof modalContent].text}
              </p>


            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


    </header>
  );
} 