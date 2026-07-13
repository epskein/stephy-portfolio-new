import MusicContent from "@/components/MusicContent";
import { getMusicReleases, getText, pick } from "@/lib/content";

export const revalidate = 60;

export default async function MusicPage() {
  const [releases, text] = await Promise.all([
    getMusicReleases(),
    getText(["music"]),
  ]);
  return (
    <MusicContent
      releases={releases}
      title={pick(text, "music", "title", "MUSIC")}
      subtitle={pick(text, "music", "subtitle", "Releases, remixes, and mixes from Stephy Longueira.")}
      footerNote={pick(text, "music", "footer_note", "More releases coming soon.")}
    />
  );
}
