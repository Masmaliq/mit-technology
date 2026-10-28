export const CONSULTATION_WHATSAPP_MESSAGE =
  "Halo Emitech, saya ingin berkonsultasi mengenai project digital untuk perusahaan kami.";

export function buildWhatsAppUrl(
  whatsapp?: string,
  message = CONSULTATION_WHATSAPP_MESSAGE
) {
  if (!whatsapp) return "";

  const cleaned = whatsapp.replace(/\D/g, "");
  const normalized = cleaned.startsWith("0") ? `62${cleaned.slice(1)}` : cleaned;

  if (!normalized) return "";

  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${normalized}?${params.toString()}`;
}
