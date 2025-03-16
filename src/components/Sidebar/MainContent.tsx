import { isLoggedIn as checkLoggedIn } from "@/lib/utils";
export async function MainContent() {
  const isLoggedIn = await checkLoggedIn();
  return (
    <div>{isLoggedIn ? <div>You are logged</div> : <div>You are not logged in</div>}</div>
  );
} 