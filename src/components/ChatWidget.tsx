"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

import { MessageCircle, X, Send } from "lucide-react";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "سلام 👋\nمن دستیار هوشمند آوان هستم.\nهر سوالی درباره خدمات، قیمت یا همکاری داری بپرس.",
    },
  ]);
useEffect(() => {  if (!conversationId) return;

  const channel = supabase
    .channel("chat-" + conversationId)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "chats",
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload: any) => {
        const row = payload.new;

        if (row.answered && row.admin_reply) {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: row.admin_reply,
            },
          ]);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [conversationId]);
  async function sendMessage() {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: userMessage,
  }),
});
const [conversationId, setConversationId] = useState<string | null>(null);
useEffect(() => {  if (!conversationId) return;

  const channel = supabase  .channel("chat-" + conversationId)
  .on(
    "postgres_changes",
    {
      event: "UPDATE",
      schema: "public",
      table: "chats",
      filter: `conversation_id=eq.${conversationId}`,
    },
    (payload: any) => {
      const row = payload.new;

      if (row.answered && row.admin_reply) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: row.admin_reply,
          },
        ]);
      }
    }
  )
  .subscribe((status) => {
    console.log("REALTIME STATUS:", status);
  });
  return () => {
    supabase.removeChannel(channel);
  };
}, [conversationId]);
const data = await res.json();
if (data.conversationId) {
  setConversationId(data.conversationId);
}

setMessages((prev) => [
  ...prev,
  {
    sender: "bot",
    text: data.reply,
  },
]);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "پیام شما ثبت شد ✅\nبه زودی پاسخ دریافت خواهید کرد.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "خطا در ارسال پیام ❌",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            left: "25px",
            bottom: "25px",
            width: "68px",
            height: "68px",
            borderRadius: "999px",
            background: "#C9A227",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            zIndex: 999999,
            boxShadow: "0 15px 35px rgba(0,0,0,.25)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MessageCircle size={30} />
        </button>
      )}

      {open && (
        <div
          style={{
            position: "fixed",
            left: "25px",
            bottom: "25px",
            width: "390px",
            height: "620px",
            background: "#fff",
            borderRadius: "28px",
            overflow: "hidden",
            zIndex: 999999,
            boxShadow: "0 30px 80px rgba(0,0,0,.25)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: "#000",
              color: "#fff",
              padding: "18px 22px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ fontWeight: 800, fontSize: 22 }}>
                دستیار آوان
              </h3>

              <p
                style={{
                  opacity: 0.7,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                همیشه آنلاین
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <X size={26} />
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              background: "#f8f8f6",
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {messages.map((msg, index) => (  <div
    key={index}
    style={{
      alignSelf:
        msg.sender === "user" ? "flex-end" : "flex-start",
      maxWidth: "85%",
      padding: "14px 18px",
      borderRadius: "24px",
      whiteSpace: "pre-line",
      lineHeight: 1.9,
      background:
        msg.sender === "user" ? "#C9A227" : "#000",
      color: "#fff",
    }}
  >
    {msg.text}
  </div>
))}
</div>
<div            style={{
              borderTop: "1px solid #eee",
              padding: 16,
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="پیام خود را بنویسید..."
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 999,
                  border: "1px solid #ddd",
                  padding: "0 18px",
                  outline: "none",
                  fontSize: 14,
                }}
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "999px",
                  background: "#C9A227",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                <Send size={22} strokeWidth={2.8} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}