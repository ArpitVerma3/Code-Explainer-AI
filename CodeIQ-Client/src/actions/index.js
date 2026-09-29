export async function explain(prevState, formData) {
    const code = formData.get("code");
    const language = formData.get("language");
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

    try {
        const res = await fetch(`${apiBaseUrl}/explain-code`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, language }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            return {
                success: false,
                error: data?.error || "Failed to fetch the result.",
            };
        }

        if (!data?.explanation) {
            return {
                success: false,
                error: "The API returned no explanation for this code.",
            };
        }

        return {
            success: true,
            data,
        };
    } catch (err) {
        return {
            success: false,
            error: `An error occurred: ${err?.message || "Unknown error"}`,
        };
    }
}
