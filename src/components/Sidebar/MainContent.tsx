import { auth } from "@/lib/utils";
export async function MainContent() {
  const isLoggedIn = await auth.auth();
  return (
    <div>
      {isLoggedIn ? <div>You are logged</div> : <div>You are not logged in</div>}
    </div>
  );
}
