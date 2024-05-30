import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div>
      <div className="header flex justify-between m-[1rem]">
        <h1 className="header__title">The Next Typer</h1>

        <nav className="header__nav flex gap-[0.5rem]">
          <Link href="/">Home</Link>
          <Link href="/setting">Setting</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
