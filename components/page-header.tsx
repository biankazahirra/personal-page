import type { ReactNode } from "react";

import { PartLabel } from "@/components/part-label";

type PageHeaderProps = {
  /** Part number, e.g. C02. */
  code: string;
  /** Module name, e.g. about. */
  name: string;
  title: string;
  lede?: string;
  children?: ReactNode;
};

export function PageHeader({ code, name, title, lede, children }: PageHeaderProps) {
  return (
    <header className="mx-auto max-w-[1440px] px-6 pb-14 pt-32 md:px-12 md:pb-24 md:pt-44">
      <PartLabel code={code} name={name} />
      <h1 className="display mt-6 max-w-[18ch] text-[clamp(3rem,9vw,7rem)]">{title}</h1>
      {lede ? <p className="mt-8 max-w-[46ch] text-lg text-ink-muted">{lede}</p> : null}
      {children}
    </header>
  );
}
