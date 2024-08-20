export const AboutSection = () => {
  return (
    <div className="flex flex-row items-center justify-center mb-12">
      <div className="w-1/2">
        <img
          src="https://images.unsplash.com/photo-1471086569966-db3eebc25a59?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image alt text"
          className="w-full"
        />
      </div>
      <div className="w-1/2 pl-12">
        <h2 className="mb-2 text-3xl font-bold">About Us</h2>
        <h3 className="mb-4 text-lg font-medium text-gray-600">Learn more about our team</h3>
        <p className="text-lg text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed,
          convallis ex.
        </p>
      </div>
    </div>
  );
};
