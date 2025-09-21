import loadingIcon from "@/assets/images/loading.svg";
const Spinner = () => {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-gray-500/10 z-50 flex justify-center items-center">
      <img src={loadingIcon} width={100} height={100}/>
    </div>
  );
};

export default Spinner;
