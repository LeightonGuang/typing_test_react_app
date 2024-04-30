import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between m-4">
        <h1>The Next Typer</h1>

        <nav className="flex gap-2">
          <Link href="/">Home</Link>
          <Link href="/setting">Setting</Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
