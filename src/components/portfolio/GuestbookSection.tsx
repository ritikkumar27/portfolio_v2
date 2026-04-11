"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import GuestbookForm from "./GuestbookForm";
import GuestbookList from "./GuestbookList";

export default function GuestbookSection() {
  return (
    <section id="guestbook" className="section-padding relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <SectionHeading text="Guest" highlight="Book" />
        <p className="text-white mt-4" style={{ fontSize: "var(--font-size-body-lg)" }}>
          Leave a message — say hi, share feedback, or just drop a note.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <GuestbookForm />
        <GuestbookList />
      </div>
    </section>
  );
}
