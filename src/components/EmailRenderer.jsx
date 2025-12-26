import { useEffect, useRef } from "react";

export default function EmailRenderer({ html }) {
    const iframeRef = useRef(null);

    useEffect(() => {
        if (!iframeRef.current) return;

        const doc = iframeRef.current.contentDocument;
        if (!doc) return;

        doc.open();
        doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <base target="_blank" />
          <style>
            body {
              margin: 0;
              padding: 12px;
              font-family: Arial, Helvetica, sans-serif;
              font-size: 14px;
              line-height: 1.6;
              color: #111;
              background: white;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            table {
              max-width: 100%;
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `);
        doc.close();
    }, [html]);

    return (
        <iframe
            ref={iframeRef}
            title="email-content"
            sandbox="allow-same-origin allow-popups"
            style={{
                width: "100%",
                border: "none",
                minHeight: 300
            }}
        />
    );
}
