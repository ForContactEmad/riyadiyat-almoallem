import Link from "next/link";
import DirectionalArrow from "./DirectionalArrow";

type SectionHeaderProps = {
  title: React.ReactNode;
  /** رابط «عرض الكل» في الطرف المقابل للعنوان */
  link: { href: string; label: string };
};

export default function SectionHeader({ title, link }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <h2 className="flex items-center gap-2 text-2xl font-extrabold">{title}</h2>
      <Link href={link.href} className="flex items-center gap-1 text-sm font-bold text-accent">
        {link.label} <DirectionalArrow direction="forward" />
      </Link>
    </div>
  );
}
