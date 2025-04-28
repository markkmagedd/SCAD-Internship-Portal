import SideBar from "@/components/app-sidebar";

export default function LoginLayout({ children }) {
  return (
    <div className="grid grid-cols-2 min-h-screen ">
      <div className="flex items-center justify-center">{children}</div>
      <div className="flex items-center justify-center"></div>
    </div>
  );
}
