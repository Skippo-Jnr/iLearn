import { BookOpen, FileText, LayoutDashboard, User } from "lucide-react";

export const sidebarNavLinks = [
  { to: "/dashboard", icon: LayoutDashboard, text: "Dashboard" },
  { to: "/documents", icon: FileText, text: "Documents" },
  { to: "/flashcards", icon: BookOpen, text: "Flashcards" },
  { to: "/profile", icon: User, text: "Profile" },
];
