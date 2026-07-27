"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "محمد احمدی",
    company: "مدیرعامل برند لوکس",
    text: "همکاری با آوان تجربه‌ای فوق‌العاده بود. نتیجه نهایی دقیقاً همان چیزی شد که برای برندمان تصور می‌کردیم.",
  },
  {
    name: "سارا رضایی",
    company: "فروشگاه اینترنتی",
    text: "از کیفیت طراحی، سرعت اجرا و پشتیبانی تیم واقعاً راضی هستیم. قطعاً دوباره همکاری خواهیم کرد.",
  },
  {
    name: "علی کریمی",
    company: "استارتاپ فناوری",
    text: "ظاهر جدید سایت باعث افزایش اعتماد کاربران و نرخ تبدیل شد. تیم آوان کاملاً حرفه‌ای عمل کرد.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white py-36"><div className="absolute inset-0 -z-10">  <div className="absolute left-[-200px] top-0 h-[600px] w-[600px] rounded-full bg-gray-100 blur-[150px] opacity-70"></div>

  <div className="absolute right-[-200px] bottom-0 h-[600px] w-[600px] rounded-full bg-gray-200 blur-[150px] opacity-60"></div>
</div>
      <div className="mx-auto max-w-7xl px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="text-sm uppercase tracking-[8px] text-gray-500">
            Testimonials
          </p>

          <h2 className="mt-6 text-5xl font-black">
            مشتریان
            <br />
            درباره ما چه می‌گویند؟
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group rounded-[44px] border border-black/10 bg-white p-12 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_35px_80px_rgba(0,0,0,.18)]"
            >
              <div className="mb-8 text-6xl text-gray-300">“</div>

              <p className="leading-8 text-gray-600">
                {item.text}
              </p>

              <div className="mt-10 border-t pt-6">
                <h3 className="text-2xl font-black">
                  {item.name}
                </h3>

                <p className="mt-2 text-gray-500">
                  {item.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}