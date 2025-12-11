import Sidebar from "../components/Sidebar";

export default function About() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-bold">About Page</h1>
      </div>
    </div>
  );
}