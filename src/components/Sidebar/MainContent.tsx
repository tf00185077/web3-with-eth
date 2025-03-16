import { auth } from "@/lib/utils";
import { UserData } from "./UserData";
export async function MainContent() {
  const isLoggedIn = await auth.auth();
  return (
    <div>
      <UserData />
      {isLoggedIn ? <div>You are logged</div> : <div>You are not logged in</div>}
    </div>
  );
}
