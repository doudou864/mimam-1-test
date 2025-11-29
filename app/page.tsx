import { PasswordGenerator } from "@/components/password-generator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-8 pt-12 sm:pt-16">
      <PasswordGenerator />
    </div>
  );
}
