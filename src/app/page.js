import { redirect } from "next/navigation";
import LoginFormComponent from "./login/page";

export default function HomePage() {
  const user = null; 
  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <LoginFormComponent />
    </div>
  );
}
