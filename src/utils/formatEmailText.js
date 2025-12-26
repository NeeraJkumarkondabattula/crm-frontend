export function formatEmailText(text = "") {
    if (!text) return "";

    return text
        // normalize line breaks
        .replace(/\r\n/g, "\n")
        // ensure paragraph spacing
        .replace(/\n{2,}/g, "\n\n")
        // add spacing after sentences in long lines
        .replace(/([.!?])\s+(?=[A-Z])/g, "$1\n\n")
        // trim junk whitespace
        .trim();
}
