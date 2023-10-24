import { Fragment } from "react";
import { Sidebar } from "../components/Sidebar";

function Layout(props) {
  return (
    <Fragment>
      <div className='h-screen bg-black text-white grid grid-rows-[1fr_100px]'>
        <div className='h-full grid grid-cols-[auto_1fr] p-2 gap-2 overflow-hidden'>
          <Sidebar />
          <main className="h-full w-full bg-[#121212] rounded-md overflow-hidden">{props.children}</main>
        </div>
        <div className='bg-slate-600'>Player</div>
      </div>
    </Fragment>
  );
}

export default Layout;