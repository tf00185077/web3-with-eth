import { auth } from "@/lib/utils";
export async function MainContent() {
  const session  = await auth.auth();
  return (
    <div>
      {session?.user ? <div>You are logged in </div> : <div>You are not logged in</div>}
    </div>
  );
}
