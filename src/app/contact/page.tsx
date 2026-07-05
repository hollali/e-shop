"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone, Clock, Send, Loader2 } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@stylehive.com", href: "mailto:hello@stylehive.com" },
  { icon: Phone, label: "Phone", value: "+233 50 123 4567", href: "tel:+233501234567" },
  { icon: MapPin, label: "Address", value: "Accra, Ghana", href: null },
  { icon: Clock, label: "Hours", value: "Mon - Sat: 8am - 6pm", href: null },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Have a question, suggestion, or just want to say hi? We&apos;d love to hear from you.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {contactInfo.map((info) => (
          <div key={info.label} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <info.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">{info.label}</p>
              {info.href ? (
                <a href={info.href} className="text-sm font-medium text-gray-900 hover:text-primary transition-colors">
                  {info.value}
                </a>
              ) : (
                <p className="text-sm font-medium text-gray-900">{info.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Your Name"
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                label="Your Email"
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <Input
              label="Subject"
              id="subject"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
              />
            </div>
            <Button type="submit" disabled={sending} className="gap-2">
              {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {sending ? "Sending..." : "Send Message"}
            </Button>
            {sent && (
              <p className="text-sm text-green-600 font-medium">
                Message sent! We&apos;ll get back to you soon.
              </p>
            )}
          </form>
        </div>

        <div className="md:col-span-2">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 h-full flex flex-col justify-center">
            <h3 className="font-semibold text-gray-900 mb-3">Why Shop With Us?</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">&#10003;</span>
                Authentic products guaranteed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">&#10003;</span>
                Secure payments via Paystack
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">&#10003;</span>
                Fast delivery across Africa
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">&#10003;</span>
                14-day easy returns
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">&#10003;</span>
                Dedicated customer support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
