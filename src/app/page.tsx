import Image from "next/image";
import Articles from "./components/articles";
export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center ">
      <div className="flex justify-center container pt-20 ">
        <Image
          alt=""
          src="/Logo.png"
          width={100}
          height={24}
          priority
        />
      </div>
      <div className="flex justify-center container">
        <span className="text-6xl  font-bold text-color-black ">alkye</span>

      </div>
      <span className=" font-medium text-[#6D6D6D] ]">The easiest test you will have</span>
      <div className="">
        <Articles />
      </div>
    </main>

  );
}
