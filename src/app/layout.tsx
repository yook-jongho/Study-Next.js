//server component는 동적 라우터 id값을 알 수 없음
//client component만 알 수 있다. => controll 컴포넌트를 통해서 useParma 기능을 활용.
//부분 client component 사용

import Link from "next/link";
import "./globals.css";
import { Controll } from "./Controll";

interface Props {
    children: React.ReactNode;
}
type Topics = {
    id: string;
    title: string;
};
export const metadata = {
    title: "WEB tutorial",
    description: "Generated by egoing",
};
export default async function RootLayout({ children }: Props) {
    const response = await fetch("http://localhost:9999/topics", {
        cache: "no-cache", //케쉬를 사용하지 않아야 추가된 글 목록을 바로 불러옴
    });
    const topics = await response.json();
    console.log(topics);

    return (
        <html>
            <body>
                <h1>
                    <Link href="/">WEB</Link>
                </h1>
                <ol>
                    {topics.map((topic: Topics) => {
                        return (
                            <li key={topic.id}>
                                <Link href={`/read/${topic.id}`}>
                                    {topic.title}
                                </Link>
                            </li>
                        );
                    })}
                </ol>

                {children}
                <Controll />
            </body>
        </html>
    );
}
