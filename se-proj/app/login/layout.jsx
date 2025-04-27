import SideBar from "@/components/SideBar";

export default function LoginLayout({ children }) {
  return (
    <div className="grid grid-cols-2 min-h-screen bg-[#273F4F]">
      <div className="flex items-center justify-center">{children}</div>
      <div className="flex items-center justify-center"></div>
    </div>
  );
}
