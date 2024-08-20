export const Hero = () => {
  return (
    <>
      <div className="h-screen bg-gradient-to-br from-blue-500 to-blue-300 via-blue-400">
        <div className="container p-4 pt-6 mx-auto md:p-6 lg:p-12 xl:p-24">
          <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">Hero Title</h1>
          <p className="text-lg leading-relaxed text-white md:text-xl lg:text-2xl">
            Hero subtitle
          </p>
          <div className="w-1/4">
            <p className="text-sm leading-relaxed text-white md:text-sm lg:text-base">
              This is a proof of concept for a website that will be used to store the Gospel of John on the blockchain.
              The text of the book will be stored on the Optimism network, and the website will be used to display the
              text of the book as it is confirmed by the contract.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
