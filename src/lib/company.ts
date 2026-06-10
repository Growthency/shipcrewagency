// Central, language-neutral company facts. Addresses, phone numbers, emails,
// the manning licence and map links read the same in every language edition,
// so they live here — the dictionaries only own the translated labels around
// them. Keeping one source of truth avoids the two editions drifting apart.

export const COMPANY = {
  licence: "MLA-0108, MLC 2006",
  address:
    "Kazi Plaza (2nd Floor), 517/A, S.K Mujib Road, Chattogram 4100, Bangladesh",
  phones: ["+880 1626 366030", "+880 1673 441245"],
  landline: "+880 2334 419606",
  fax: "+880 2334 419606",
  emails: ["crewing.cssl@gmail.com", "info@shipcrewagency.com"],
  /** primary number for one-tap "call us" / "speak with a specialist" buttons */
  callTel: "+8801626366030",
};

const MAP_QUERY =
  "Kazi Plaza, 517/A S.K Mujib Road, Chattogram 4100, Bangladesh";

/** Keyless Google Maps embed — renders in an <iframe> with no API key. */
export const COMPANY_MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY,
)}&z=16&output=embed`;

/** The client's shared Google Maps place link (opens the full map in a new tab). */
export const COMPANY_MAP_LINK = "https://share.google/Fb7EKrkgJG5LOvogY";
