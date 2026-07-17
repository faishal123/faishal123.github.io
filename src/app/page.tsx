import { SquareRenderer } from "./components/atoms/renderer";

export default function Home() {
  return (
    <div className="flex justify-between items-between h-screen">
      <SquareRenderer />
    </div>
  );
}
