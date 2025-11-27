export const getPageTitle = (pathname: string) => {
  if (pathname.startsWith("/main/channels")) return "Channels";
  if (pathname === "/main/dashboard") return "Dashboard";
  if (pathname === "/main/history") return "Call History";
  if (pathname === "/main/settings") return "Settings";
  if (pathname === "/main/chats") return "Chats";
  return "Not Found";
};
