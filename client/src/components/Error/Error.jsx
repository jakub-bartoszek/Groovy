import ExclamationIcon from "@heroicons/react/solid/ExclamationIcon";

const Error = () => (
 <div className="flex items-center flex-col h-[100%] justify-center">
  <div className="flex justify-center items-center w-[72px]">
   <ExclamationIcon className="w-full h-full text-[#16a34a] " />
  </div>
  <span>Something went wrong...</span>
 </div>
);

export default Error;
