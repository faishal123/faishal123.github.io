export const Square = ({ dimension = 16 }: { dimension?: number }) => {
  const containerDimension = dimension * Math.sqrt(2);
  return (
    <div
      className="flex justify-center items-center"
      style={{
        width: containerDimension,
        height: containerDimension,
      }}
    >
      <div
        data-animatedSquare="true"
        className="rotate-45 bg-white opacity-25"
        style={{ width: dimension, height: dimension }}
      ></div>
    </div>
  );
};
