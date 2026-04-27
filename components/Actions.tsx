"use client";

import { ActionLink } from "@/components/ActionLink";
import { toast } from "sonner";

export default function Actions() {
  async function handleCopyEmail() {
    const email = "letstalk@pratikjoglekar.com";

    try {
      await navigator.clipboard.writeText(email);

      toast.success("Email copied!", {
        description: email,
        duration: 2000,
      });
    } catch {
      toast.error("Failed to copy email.");
    }
  }

  return (
    <div className="flex flex-col items-start md:items-end gap-3 md:gap-2 text-sm font-bold">
      <ActionLink
        label="Download Resume"
        href="/Pratik_Joglekar_Resume.pdf"
      />

      <ActionLink
        label="Copy my Email"
        onClick={handleCopyEmail}
      />

      <ActionLink
        label="Connect on LinkedIn"
        href="https://www.linkedin.com/in/pratik-joglekar/"
      />

      <ActionLink
        label="Mentoring Call"
        href="https://adplist.org/mentors/pratik-joglekar"
      />
    </div>
  );
}
