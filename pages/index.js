import Image from "next/image";
import HeroImage from "../public/hero.webp";
import {Logo} from "../components/Logo";
import Link from "next/link";

export default function Home() {
  return (
      <div className="w-screen h-screen overflow-hidden flex items-center justify-center relative">
            <Image src={HeroImage} alt="Hero" fill className="absolute"/>

          <div className="relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900/90 rounded-md backdrop-blur-sm">
              <Logo/>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <Link href="/post/new" className="btn mt-4">Begin</Link>
          </div>
      </div>
  );
}
