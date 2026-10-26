"use client";

import { useEffect, useRef, useState } from "react";
import { FORM_REQUEST_TIMEOUT_MS, HONEYPOT_FIELD, MIN_FORM_FILL_MS } from "@/lib/constants";

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

/**
 * Sends a JSON form submission to an external form endpoint (e.g. Formspree).
 * Success is reported ONLY when the endpoint responds with a 2xx status.
 * Includes two lightweight spam checks: a honeypot field and a minimum fill time.
 */
export function useFormSubmission(endpoint: string | null) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(payload: Record<string, string | boolean>, honeypotValue: string) {
    if (!endpoint) return false;

    const elapsed = startedAt.current ? Date.now() - startedAt.current : 0;
    if (honeypotValue || elapsed < MIN_FORM_FILL_MS) {
      setStatus("error");
      setErrorMessage("We couldn't send your message. Please review your details and try again in a moment.");
      return false;
    }

    setStatus("submitting");
    setErrorMessage(null);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), FORM_REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, [HONEYPOT_FIELD]: honeypotValue }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`Form endpoint responded with ${response.status}`);

      setStatus("success");
      return true;
    } catch {
      setStatus("error");
      setErrorMessage(
        "Sorry, your message could not be sent. Please check your connection and try again, or contact us directly.",
      );
      return false;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return { status, errorMessage, submit, reset: () => setStatus("idle") };
}
