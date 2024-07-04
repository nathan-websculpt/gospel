export const LoadingSpinner = () => {
  return (
    <>
      <div className="flex flex-col items-center w-11/12 py-8 mx-auto my-8 border rounded-lg xl:py-32 xl:my-12 xl:w-3/5 border-base-300 bg-primary">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </>
  );
};
