import { Outlet, Link } from "react-router-dom";
import React from "react";
import { ReactComponent as Logo } from "./assets/logo.svg";

function Layout({ onLogoClick = () => { } }) {
  return (
    <div className="min-h-screen bg-gray">
      <header className="bg-orange shadow-lg text-white h-20 flex items-center fixed w-full">
        <Link
          to="/"
          className="mx-auto"

        >
          <Logo />
        </Link>
      </header>
      {/*<div className="fixed w-96 h-96 bg-red-700 overflow-hidden flex flex-col">
        <div className="bg-yellow-400 h-10">asdf</div>
        <div className="bg-yellow-700 overflow-auto flex-grow">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
        </div>
        <div className="bg-yellow-400 h-10">asdf</div>
  </div> */}
      <main className="bg-gray pt-20 h-screen overflow-hidden flex flex-col text-2xl md:text-3xl">
        <Outlet />
      </main>
      <div className="hidden h-32 w-full fixed bottom-0 bg-orange"></div>
    </div>
  );
}

export default Layout;
