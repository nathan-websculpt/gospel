export const Hero = () => {
  return (
    <>
      <div
        className="h-screen bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1471086569966-db3eebc25a59?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="container p-4 pt-6 mx-auto md:p-6 lg:p-12 xl:p-24">
          <h1 className="text-3xl font-bold leading-tight text-black md:text-5xl lg:text-6xl">Hero Title</h1>
          <p className="text-lg leading-relaxed text-black md:text-xl lg:text-2xl">Hero subtitle</p>
        </div>
      </div>

      
    </>
  );
};
