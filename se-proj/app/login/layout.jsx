export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#EC1024] to-[#EC1024] via-[#FF6F1B]">
      <main>{children}</main>
    </div>
  );
}
