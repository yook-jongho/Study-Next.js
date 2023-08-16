"use client";
import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();
    return (
        <form
            onSubmit={async (evt: React.FormEvent<HTMLFormElement>) => {
                evt.preventDefault();
                const form = evt.target as HTMLFormElement;
                const title = form.elements.namedItem(
                    "title"
                ) as HTMLInputElement;
                const body = form.elements.namedItem(
                    "body"
                ) as HTMLTextAreaElement;
                const resp = await fetch("http://localhost:9999/topics/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: title.value,
                        body: body.value,
                    }),
                });
                const topic = await resp.json();
                console.log("file: page.js:19 ~ Create ~ topic:", topic);
                router.push(`/read/${topic.id}`);
                router.refresh();
            }}
        >
            <h2>Create</h2>
            <p>
                <input type="text" name="title" placeholder="title" />
            </p>
            <p>
                <textarea name="body" placeholder="body"></textarea>
            </p>
            <p>
                <input type="submit" value="create" />
            </p>
        </form>
    );
}
