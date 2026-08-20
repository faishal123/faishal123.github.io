import { CircleRenderer } from "./components/atoms/CircleRenderer/CircleRenderer";
import { DarkModeToggle } from "./components/atoms/DarkModeToggle/DarkModeToggle";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="fixed top-0 left-0 z-999 w-screen h-screen pointer-events-none">
        <div className="flex justify-end p-4">
          <DarkModeToggle />
        </div>
      </div>
      {/* <CircleRenderer /> */}
    </div>
  );
}
