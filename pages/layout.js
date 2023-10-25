import { Fragment } from "react";
import { Sidebar } from "../components/Sidebar";
import { Player } from "../components/Player";

function Layout(props) {
  return (
    <Fragment>
      <div className='h-screen bg-black text-white grid grid-rows-[1fr_100px]'>
        <div className='h-full grid grid-cols-[auto_1fr] p-2 gap-2 overflow-hidden'>
          <Sidebar />
          <main className="h-full w-full bg-[#121212] rounded-md overflow-hidden">{props.children}</main>
        </div>
        <Player/>
      </div>
    </Fragment>
  );
}

export default Layout;