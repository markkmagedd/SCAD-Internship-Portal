export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#000000] via-[#EC1024] to-[#FF6F1B]">
      <main>{children}</main>
    </div>
  );
}
