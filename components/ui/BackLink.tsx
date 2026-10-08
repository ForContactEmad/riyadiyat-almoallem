import Link from "next/link";
import DirectionalArrow from "./DirectionalArrow";

export default function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-1 text-sm font-bold text-accent">
      <DirectionalArrow direction="back" /> {children}
    </Link>
  );
}
