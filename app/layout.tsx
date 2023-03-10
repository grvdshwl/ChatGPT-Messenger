import ClientProvider from "@/components/ClientProvider/ClientProvider";
import Login from "@/components/Login/Login";
import { SessionProvider } from "@/components/SessionProvider/SessionProvider";
import Sidebar from "@/components/Sidebar/Sidebar";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              {/* Sidebar */}
              <div className="bg-[#202123] mx-w-xs h-screen overflow-y-scroll md:min-w-[20rem]">
                <Sidebar />
              </div>

              {/* Client Provider - Notification */}
              <ClientProvider />
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
