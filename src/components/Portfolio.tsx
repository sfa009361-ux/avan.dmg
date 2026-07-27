"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Luxury Fashion",
    category: "Website",
    image: "/portfolio/1.jpg",
  },
  {
    title: "Interior Studio",
    category: "Branding",
    image: "/portfolio/2.jpg",
  },
  {
    title: "Coffee House",
    category: "UI Design",
    image: "/portfolio/3.jpg",
  },
  {
    title: "Architecture",
    category: "Website",
    image: "/portfolio/4.jpg",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="bg-[#f7f7f5] py-28"
    >
      <div className="mx-auto max-w-[1300px] px-2">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex items-end justify-between"
        >

          <div>

            <p className="mb-5 text-sm uppercase tracking-[3px] text-[#c89b63]">
              Portfolio
            </p>

            <h2 className="text-6xl font-black leading-tight">
              پروژه‌های منتخب
            </h2>

          </div>

          <button className="rounded-full border border-black px-8 py-4 transition hover:bg-black hover:text-white">
            مشاهده همه پروژه‌ها
          </button>

        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
            {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: .7,
              delay: index * .12,
            }}
            viewport={{ once: true }}
            className="group overflow-hidden rounded-[42px] bg-white shadow-[0_25px_70px_rgba(0,0,0,.08)]"
          >

            <div className="relative overflow-hidden">

              <img
                src={project.image}
                alt={project.title}
                className="h-[560px] w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

            </div>

            <div className="flex items-center justify-between p-10">

              <div>

                <p className="mb-3 text-sm uppercase tracking-[5px] text-[#c89b63]">

                  {project.category}

                </p>

                <h3 className="text-4xl font-black">

                  {project.title}

                </h3>

              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white transition duration-500 group-hover:rotate-45">

                <ArrowUpRight size={24} />

              </div>

            </div>

          </motion.div>

        ))}
        </div>
      </div>

    </section>
  );
}
        