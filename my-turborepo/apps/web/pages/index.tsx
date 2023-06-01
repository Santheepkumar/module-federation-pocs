import dynamic from "next/dynamic";

// @ts-ignore
const Header = dynamic(() => import("docs/Header"), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>Web</h1>
      <Header />
    </div>
  );
}
