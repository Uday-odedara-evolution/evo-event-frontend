"use client";
import { eventEmitter } from "@/utils/EventEmitter";
import { useEffect, useState } from "react";

let count = 0;

export default function AppLoader() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    eventEmitter.subscribe("loader", (state) => {
      if (state) {
        count += 1;
      } else {
        count = count - 1 <= 0 ? 0 : count - 1;
      }

      if (count === 1) {
        setIsLoading(true);
      }
      if (count === 0) {
        setIsLoading(false);
      }
    });

    return () => {
      eventEmitter.unsubscribe("loader");
    };
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-[#000000ba] flex justify-center items-center">
      <span className="text-white text-4xl">Loading...</span>
    </div>
  );
}
