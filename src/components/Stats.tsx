"use client";
import { motion } from "framer-motion";
const stats = [
  { value: "120+", title: "پروژه" },
  { value: "50+", title: "درخواست های ثبت شده" },
  { value: "7+", title: "سال تجربه" },
  { value: "24ساعته", title: "پشتیبانی" },
];
export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0b] py-32 text-white">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-[100px] w-[100px] rounded-full bg-[#c7a36a]/10 blur-[180px]" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#c7a36a]/5 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex items-end justify-between"
        >
          <div>
            <p className="mb-4 text-sm uppercase tracking-[8px] text-[#c7a36a]">
              NUMBERS
            </p>

            <h2 className="text-6xl font-black leading-tight">
             اعدادی که اعتماد می سازد
            
            </h2>
          </div>

          <p className="max-w-md leading-8 text-gray-400">
            هر عدد نتیجه سال‌ها تجربه، پروژه‌های موفق و اعتماد برندهایی است که با آوان همکاری کرده‌اند.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-4 hover:border-[#c7a36a]/40 hover:bg-white/[0.05]"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#c7a36a]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

              <h3 className="text-7xl font-black tracking-tight text-[#c7a36a]">
                {item.value}
              </h3>

              <div className="mt-8 h-px w-full bg-white/10" />

              <p className="mt-8 text-xl font-medium text-white/80">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}        
        

