import SearchField from "@/components/custom/SearchField";
import UserButton from "@/components/custom/UserButton";
import Icons from "@/components/landing-page/Icons";
import Link from "next/link";
import React from "react";

const NavigationBar = () => {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-5 px-5 py-3">
        <Link href="/home" className="flex items-center gap-2">
          <Icons.logo className="h-8 w-8" />
          <span className="hidden text-2xl font-bold md:block">
            Tricksters Worlds
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <SearchField />
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
