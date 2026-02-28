"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div style={{ padding: 24 }}>
            <h2 style={{ fontWeight: 700, fontSize: 18 }}>Edit page error</h2>
            <p style={{ marginTop: 12 }}>{error.message}</p>
            {error.digest ? <p>digest: {error.digest}</p> : null}

            <pre style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>
                {error.stack}
            </pre>

            <button
                onClick={() => reset()}
                style={{ marginTop: 16, padding: "8px 12px" }}
            >
                Try again
            </button>
        </div>
    );
}
