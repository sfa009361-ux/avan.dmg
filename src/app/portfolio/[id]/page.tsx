import { createClient } from "@supabase/supabase-js";import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function PortfolioDetails({
  params,
}: {
  params: { id: string };
}) {
  const { data: project } = await supabase
    .from("portfolio")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8f8f6] py-24">
      <div className="mx-auto max-w-6xl px-8">
        <img
          src={project.image}
          alt={project.title}
          className="h-[550px] w-full rounded-[32px] object-cover shadow-xl"
        />

        <div className="mt-16">
          <p className="uppercase tracking-[6px] text-gray-500">
            {project.category}
          </p>

          <h1 className="mt-4 text-6xl font-black">
            {project.title}
          </h1>

          <p className="mt-10 text-xl leading-10 text-gray-700">
            {project.description}
          </p>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex rounded-full bg-black px-10 py-5 text-white"
            >
              مشاهده پروژه
            </a>
          )}
        </div>
      </div>
    </main>
  );
}