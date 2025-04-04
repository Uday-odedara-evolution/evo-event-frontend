import { AppGuard } from "@/components";

export default function RootLayout({ children }) {
  return (
    <div>
      <AppGuard>{children}</AppGuard>
    </div>
  );
}
