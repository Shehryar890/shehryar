




  const Loader = ({ className = "", small = false }) => {
  if (small) {
    return (
      <div
        className={`animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent ${className}`}
      ></div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <div
        className={`animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent ${className}`}
      ></div>
    </div>
  );
};


export default Loader;
