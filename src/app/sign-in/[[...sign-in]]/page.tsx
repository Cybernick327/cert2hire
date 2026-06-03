import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#080F24", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <SignIn />
    </div>
  );
}
