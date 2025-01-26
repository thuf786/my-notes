import { redirect } from "next/navigation";
import LoginFormComponent from "@/Components/login-form";

export default function HomePage() {
  // const user = null; 
  // if (!user) {
  //   redirect("/login");
  // }

  return (
    <div>
      <LoginFormComponent />
    </div>
  );
}
