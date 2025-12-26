export function stripHtml(html = "") {
    if (!html) return "";

    return html
        // remove script/style blocks
        .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
        // remove all tags
        .replace(/<\/?[^>]+(>|$)/g, "")
        // decode common entities
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        // collapse whitespace
        .replace(/\s+/g, " ")
        .trim();
}
