"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* Background Image */}

      <img
        src="/hero.jpg"
        alt="Avan Hero"
        className="absolute inset-0 h-280 w-470 object-cover object-center -z-20"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/70 -z-10" />

      {/* Golden Glow */}

      <div className="absolute right-0 top-0 h-[700px] w-[700px] rounded-full bg-[#c89b63]/20 blur-[180px]" />

      <div className="relative z-20mx-auto flex min-h-screen max-w-[1600px] items-center px-6 md:px-10 xl:px-20">
<div className="max-w-[706px] bg-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-[760px]"
        >

          {/* Badge */}

          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md">

            <span className="h-2.5 w-2.5 rounded-full bg-[#c89b63] animate-pulse" />

            <span className="text-xs tracking-[8px] uppercase text-white/80">
              AVAN DMG
            </span>

          </div>

          {/* Title */}

          <h1 className="text-5xl font-black leading-[1.05] tracking-[-2px] text-white md:text-7xl xl:text-[92px]">

            آژانس تبلیغاتی

            <span className="mt-2 block text-[#c89b63]">
              آوان
            </span>

            <span className="mt-5 block text-3xl font-light leading-relaxed tracking-normal text-white/90 md:text-4xl">
              طراحی، برندینگ و تبلیغات
              <br />
              برای برندهای ماندگار
            </span>

          </h1>

          {/* Description */}

          <p className="mt-10 max-w-[650px] text-lg leading-9 text-gray-300 md:text-xl">

            آوان با تمرکز بر طراحی هویت بصری، تولید محتوای حرفه‌ای،
            طراحی وب‌سایت و اجرای کمپین‌های تبلیغاتی،
            برند شما را به یک تجربه ماندگار تبدیل می‌کند.

          </p>

          {/* Buttons */}

          <div className="mt-14 flex flex-wrap gap-5">

            <Link href="/order">

              <button className="group flex items-center gap-3 rounded-full bg-[#c89b63] px-9 py-5 font-bold text-black transition-all duration-500 hover:scale-105">

                ثبت سفارش

                <ArrowUpRight
                  size={20}
                  className="transition duration-500 group-hover:rotate-45"
                />

              </button>

            </Link>

            <a href="#portfolio">

              <button className="rounded-full border border-white/25 bg-white/10 px-9 py-5 text-white backdrop-blur-md transition hover:bg-white hover:text-black">

                مشاهده نمونه‌کارها

              </button>

            </a>

          </div>
          {/* Stats */}
          <div className="mt-20 flex flex-wrap gap-6">

            <div className="rounded-3xl border border-white/15 bg-white/10 px-8 py-7 backdrop-blur-md transition hover:scale-105">

              <h3 className="text-4xl font-black text-[#c89b63]">
                +250
              </h3>

              <p className="mt-2 text-white/70">
                پروژه موفق
              </p>

            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 px-8 py-7 backdrop-blur-md transition hover:scale-105">

              <h3 className="text-4xl font-black text-[#c89b63]">
                98%
              </h3>

              <p className="mt-2 text-white/70">
                رضایت مشتریان
              </p>

            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 px-8 py-7 backdrop-blur-md transition hover:scale-105">

              <h3 className="text-4xl font-black text-[#c89b63]">
                +7
              </h3>

              <p className="mt-2 text-white/70">
                سال تجربه
              </p>

            </div>

          </div>

        </motion.div>

      </div>
     </section>  );
} 

      
 

