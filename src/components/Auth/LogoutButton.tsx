import { auth } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export function LogoutButton() {
  const handleLogout = async () => {
    'use server';
    await auth.signOut();
  };
  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
}
