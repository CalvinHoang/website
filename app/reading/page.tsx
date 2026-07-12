import type { Metadata } from "next";
import { siteContent } from "../content";
import { SiteHeader } from "../SiteHeader";

export const metadata: Metadata = {
  title: "Calvin Hoang - Reading",
  description: "Recent reading and online resources I return to.",
};

export default function OnlineResourcesPage() {
  return (
    <main className="reading-page" id="top">
      <SiteHeader active="reading" />

      <section className="resources-introduction">
        <p>{siteContent.onlineResources.introduction}</p>
        <ul className="resource-list">
          {siteContent.onlineResources.recent.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.href}</a>, {item.author}, {item.note}
            </li>
          ))}
        </ul>
      </section>

      <section className="resource-section">
        <h1>Conduits</h1>
        <ul className="resource-list">
          {siteContent.onlineResources.people.map((item) => (
            <li key={item.name}>
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
