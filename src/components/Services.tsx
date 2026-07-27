"use client";
import { motion } from "framer-motion";
import {
  Gem,
  PenTool,
  BadgeCheck,
  Lightbulb,
  ArrowLeft,
} from "lucide-react";

const services = [
  {
    icon: Gem,
    title: "برندسازی",
    desc: "ساخت هویت بصری کامل، استراتژی برند و جایگاه‌سازی حرفه‌ای.",
  },
  {
    icon: PenTool,
    title: "طراحی گرافیک",
    desc: "طراحی لوگو، پست شبکه‌های اجتماعی، ست اداری و تمامی اقلام برند.",
  },
  {
    icon: BadgeCheck,
    title: "طراحی پوستر",
    desc: "خلق پوسترهای اختصاصی، مفهومی و ماندگار متناسب با شخصیت برند.",
  },
  {
    icon: Lightbulb,
    title: "ایده پردازی تبلیغاتی",
    desc: "طراحی کمپین، خلاقیت تبلیغاتی و ایده‌های نو برای رشد برند.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#0d0d0f] py-24 text-white"
    >
      <div className="mx-auto max-w-[1400px] px-10">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          <p className="mb-5 text-center text-sm tracking-[8px] text-[#c89b63] uppercase">
            خدمات ما
          </p>

          <h2 className="text-center text-3xl font-black leading-tight">
            راهکارهای خلاقانه
            <br />
            برای رشد برند شما
          </h2>

        </motion.div>

        <div className="mt-20 grid gap-7 lg:grid-cols-4">

        </div>{services.map((service, index) => {
          const Icon = service.icon;

          return (

            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: .7,
                delay: index * .12,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-[#141416] p-8 transition-all duration-500 hover:-translate-y-3 hover:border-[#c89b63]/40 hover:bg-[#18181b]"
            >

              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#c89b63]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1e1f22] text-[#d7b07b] transition duration-500 group-hover:rotate-6 group-hover:scale-110">

                <Icon size={30} />

              </div>

              <h3 className="text-3xl font-black">

                {service.title}

              </h3>

              <p className="mt-6 leading-8 text-white/60">

                {service.desc}

              </p>

              <button className="mt-10 flex items-center gap-3 text-sm font-bold tracking-[2px] text-[#d7b07b] transition duration-300 group-hover:gap-5">

                بیشتر بدانید

                <ArrowLeft
                  size={18}
                  className="transition duration-300"
                />

              </button>

            </motion.div>

          );

        })}</div>
    </section>
  );
}