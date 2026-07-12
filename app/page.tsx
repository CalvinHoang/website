import type { Metadata } from "next";
import { siteContent } from "./content";
import { SiteHeader } from "./SiteHeader";

export const metadata: Metadata = {
  title: "Calvin Hoang - About",
  description: "A simple personal About page.",
};

export default function Home() {
  return (
    <main className="about-page" id="top">
      <SiteHeader active="about" />

      <img
        className="portrait-placeholder"
        src="/portrait.jpg"
        alt="Calvin Hoang"
      />

      <section className="about-copy" aria-label="About Calvin">
        <p className="contact-line">
          <strong>Contact:</strong>{" "}
          <a href={`mailto:${siteContent.about.contact}`}>
            {siteContent.about.contact}
          </a>
          .
        </p>

        <p className="introduction">
          {siteContent.about.paragraph}
          <a href={siteContent.about.project.href}>
            {siteContent.about.project.name}
          </a>
          {siteContent.about.paragraphAfterProject}
        </p>

        <p className="colon-line">
          <strong>{siteContent.about.current}</strong>
        </p>

        <ul>
          {siteContent.about.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <footer className="other-links">
        <p>Other links</p>
        <nav aria-label="Other links">
          {siteContent.links.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
    </main>
  );
}
