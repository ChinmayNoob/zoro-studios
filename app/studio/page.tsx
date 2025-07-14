import StudioPage from "@/components/studio/studio-page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Zoro Studio | Home",
    description: "Zoro Studio is a creative agency and studio that makes music and videos",
}

export default function Home() {
    return (
        <StudioPage />
    )

}