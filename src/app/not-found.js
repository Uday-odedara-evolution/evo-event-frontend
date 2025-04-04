import { NoRecordIcon } from "@/assets/svg";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-4">
      <div className="text-center text-3xl font-bold">Page not found</div>
      {/* <p>Could not find requested resource</p> */}
      <div>
        <div>
          <NoRecordIcon />
        </div>
      </div>
      <Link className="text-2xl text-sky-800 underline" href="/">
        Return Home
      </Link>
    </div>
  );
}
