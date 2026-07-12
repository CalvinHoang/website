import { siteContent } from "./content";

type SiteHeaderProps = {
  active: "about" | "reading";
};

export function SiteHeader({ active }: SiteHeaderProps) {
  const sectionName = active === "about" ? "About me" : "Reading";

  return (
    <header className="site-navigation">
      <div className="site-identity">
        <a className="site-name" href="/">
          {siteContent.name}
        </a>
        <p className="active-section">{sectionName}</p>
      </div>
      <nav aria-label="Primary navigation">
        <a href="/" aria-current={active === "about" ? "page" : undefined}>
          About me
        </a>
        <a
          href="/reading"
          aria-current={active === "reading" ? "page" : undefined}
        >
          Reading
        </a>
      </nav>
    </header>
  );
}
