import { LoaderIcon } from "@/assets/svg";

export default function Home() {
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center">
      <div className="flex h-[200px] w-[200px]">
        <LoaderIcon />
      </div>
    </div>
  );
}
