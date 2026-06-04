import { Reveal } from "@/components/fx/Reveal";

export function SectionHeader({
  tag,
  title,
  text,
  dark = false,
  className,
}: {
  tag?: string;
  title: string;
  text?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`sec-header ${dark ? "sec-header--dark" : ""} ${className ?? ""}`}>
      {tag && <div className="tag">{tag}</div>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}
