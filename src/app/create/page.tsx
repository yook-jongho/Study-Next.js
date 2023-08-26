"use client"; //위의 코드를 사용하면 client component로 전환

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
    const router = useRouter(); //useRouter 객체 생성
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        const resp = await fetch(`http://localhost:9999/topics/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, body }),
        });
        const topic = await resp.json();
        console.log("file: page.js:19 ~ Create ~ topic:", topic);

        // router.push를 사용하면 페이지 리로드 없이 사용자의 화면을 해당 페이지로 이동합니다.
        // router.refresh를 사용하면 서버 컴포넌트를 서버 쪽에서 다시 랜더링해서 새로 고침할 수 있습니다.
        // 여기서는 app/layout.js을 새로고침하기 위해서 사용된 코드입니다.
        router.push(`/read/${topic.id}`);
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create</h2>
            <p>
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
            </p>
            <p>
                <textarea
                    name="body"
                    placeholder="body"
                    value={body}
                    onChange={(e) => {
                        setBody(e.target.value);
                    }}
                ></textarea>
            </p>
            <p>
                <input type="submit" value="create" />
            </p>
        </form>
    );
}
