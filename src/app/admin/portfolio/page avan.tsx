"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Portfolio = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  url: string;
};

export default function PortfolioAdmin() {
  const [items, setItems] = useState<Portfolio[]>([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    getPortfolio();
  }, []);

  async function getPortfolio() {
    const { data } = await supabase
      .from("portfolio")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setItems(data as Portfolio[]);
  }

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    const fileName = `${Date.now()}-${file.name}`;

    setUploading(true);

    const { error } = await supabase.storage
      .from("portfolio")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      alert(error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("portfolio")
      .getPublicUrl(fileName);

    setImageUrl(data.publicUrl);

    setUploading(false);
  }

  async function addPortfolio() {
    if (!imageUrl) {
      alert("ابتدا عکس را آپلود کن.");
      return;
    }

    const { error } = await supabase
      .from("portfolio")
      .insert([
        {
          title,
          category,
          image: imageUrl,
          description,
          url,
        },
      ]);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    resetForm();

    alert("پروژه با موفقیت اضافه شد");

    getPortfolio();
  }

  function startEdit(item: Portfolio) {
    setEditingId(item.id);

    setTitle(item.title);
    setCategory(item.category);
    setDescription(item.description);
    setUrl(item.url);
    setImageUrl(item.image);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function updatePortfolio() {
    if (!editingId) return;

    const { error } = await supabase
      .from("portfolio")
      .update({
        title,
        category,
        image: imageUrl,
        description,
        url,
      })
      .eq("id", editingId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("پروژه بروزرسانی شد");

    resetForm();

    getPortfolio();
  }

  function resetForm() {
    setEditingId(null);

    setTitle("");
    setCategory("");
    setDescription("");
    setUrl("");
    setImageUrl("");
  }

  async function deletePortfolio(id: string) {
    await supabase
      .from("portfolio")
      .delete()
      .eq("id", id);

    getPortfolio();
  }

  return (
    <main className="min-h-screen bg-[#f8f8f6] p-10">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-10 text-5xl font-black">
          مدیریت نمونه‌کارها
        </h1>

        <div className="mb-16 rounded-3xl bg-white p-8 shadow-xl">

          <div className="grid gap-6">

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان پروژه"
              className="rounded-xl border p-4"
            />

            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="دسته‌بندی"
              className="rounded-xl border p-4"
            />

            <div>

              <label className="mb-3 block font-semibold">
                تصویر پروژه
              </label>

              <input  type="file"
  accept="image/*"
  onChange={uploadImage}
  className="w-full rounded-xl border p-4"
/>

{uploading && (
  <p className="mt-3 text-gray-500">
    در حال آپلود...
  </p>
)}

{imageUrl && (
  <img
    src={imageUrl}
    alt=""
    className="mt-4 h-40 rounded-xl object-cover"
  />
)}

</div>

<textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="توضیحات"
  rows={4}
  className="rounded-xl border p-4"
/>
            

            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="لینک پروژه"
              className="rounded-xl border p-4"
            />

            <div className="flex gap-4">

              <button
                onClick={editingId ? updatePortfolio : addPortfolio}
                className="flex-1 rounded-xl bg-black py-4 font-bold text-white"
              >
                {editingId ? "ذخیره تغییرات" : "افزودن پروژه"}
              </button>

              {editingId && (
                <button
                  onClick={resetForm}
                  className="rounded-xl bg-gray-300 px-8"
                >
                  لغو
                </button>
              )}

            </div>

          </div>

        </div>

        <div className="space-y-6">

          {items.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between rounded-3xl bg-white p-8 shadow-xl"
            >

              <div className="flex items-center gap-6">

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-28 w-40 rounded-xl object-cover"
                />

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    {item.category}
                  </p>

                  <p className="mt-2 max-w-xl text-sm text-gray-600">
                    {item.description}
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => startEdit(item)}
                  className="rounded-xl bg-blue-600 px-6 py-3 text-white"
                >
                  ویرایش
                </button>

                <button
                  onClick={() => deletePortfolio(item.id)}
                  className="rounded-xl bg-red-500 px-6 py-3 text-white"
                >
                  حذف
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}