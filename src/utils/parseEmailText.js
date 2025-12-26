export function parseEmailText(text = "") {
    if (!text) return { body: "", signature: "" };

    // Normalize
    const clean = text.replace(/\r\n/g, "\n").trim();

    // Common signature separators
    const signatureMarkers = [
        "\nRegards,",
        "\nThanks,",
        "\nThank you,",
        "\nBest regards,",
        "\nSincerely,"
    ];

    let body = clean;
    let signature = "";

    for (const marker of signatureMarkers) {
        const idx = clean.indexOf(marker);
        if (idx !== -1) {
            body = clean.slice(0, idx).trim();
            signature = clean.slice(idx).trim();
            break;
        }
    }

    return { body, signature };
}
