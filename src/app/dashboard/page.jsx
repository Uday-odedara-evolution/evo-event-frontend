"use client";
import {
  ArrowIcon,
  CardViewButtonIcon,
  CrossIcon,
  EvoEventIcon,
  FilterButtonIcon,
  LeafIcon,
  NoRecordIcon,
  SearchIcon,
  UserIcon,
} from "@/assets/svg";
import { EventModal } from "@/components";
import { useState } from "react";

export default function Dashboard() {
  const [isSearching, setIsSearching] = useState(false);
  const [hasRecord, setHasRecord] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const list = [0, 1, 2, 4, 5];

  return (
    <div>
      <div className=" bg-[#FFF1EA] h-[100vh] p-3 lg:px-20 flex flex-col gap-2 w-[100vw]">
        {isSearching ? (
          <div className="bg-white p-2 px-4 flex gap-1 rounded-[16px] items-center shadow-md shadow-[#00000014]">
            <div>
              <ArrowIcon />
            </div>
            <div>
              <input
                type="text"
                className="outline-0 ms-2"
                placeholder="Search here.."
              />
            </div>
            <div className="ms-auto">
              <span>
                <CrossIcon />
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-white p-2 flex gap-1 rounded-[16px] items-center shadow-md shadow-[#00000014]">
            <div className="h-[40px]">
              <EvoEventIcon />
            </div>
            <div className="ms-auto flex items-center justify-center rounded-md border-[1px] p-1 h-full border-[#EAEAEA]">
              <button className="flex h-[18px] w-[18px] max-h-[40px] max-w-[40px] cursor-pointer">
                <SearchIcon />
              </button>
              <div className="hidden lg:block">
                <input
                  type="text"
                  className="outline-0 ms-2"
                  placeholder="Search here.."
                />
              </div>
            </div>
            <div className="flex items-center justify-center rounded-md  p-1 bg-[#EAEAEA]">
              <div>
                <UserIcon />
              </div>
            </div>
          </div>
        )}
        {hasRecord ? (
          <>
            {list.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2">
                    <span className="rounded-[8px] border-[1px] border-[#06060680] p-2">
                      <FilterButtonIcon />
                    </span>
                    <span className="rounded-[8px] border-[1px] border-[#06060680] p-2">
                      <CardViewButtonIcon />
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="gradient-bg px-6 font-sans py-2 text-[16px] text-white"
                    >
                      Add New Event
                    </button>
                  </div>
                </div>
                <div className="mt-2">card view</div>
              </div>
            ) : (
              <>
                <div className="mt-3">
                  <div className="font-medium text-[24px] text-[#060606] font-sans">
                    Events
                  </div>
                  <div className="font-normal text-[16px] text-[#06060680]">
                    View and manage every events of the future.
                  </div>
                </div>
                <div className="flex-1 flex justify-center items-center gap-2 flex-col p-2">
                  <div>
                    <LeafIcon />
                  </div>
                  <div className="text-center">
                    <span className="text-[#06060680] text-[20px] text-center">
                      No Event’s to show yet ! add new event here...
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="gradient-bg px-6 font-sans py-2 text-[16px] text-white"
                    >
                      Add New Event
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex-1 flex justify-center items-center gap-2 flex-col p-2">
            <div>
              <NoRecordIcon />
            </div>
            <div className="text-[#06060680] flex flex-col text-center text-[20px] lg:text-[24px]">
              <span>No events found !</span>
              <span>try searching with different word.</span>
            </div>
          </div>
        )}
      </div>
      <EventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
