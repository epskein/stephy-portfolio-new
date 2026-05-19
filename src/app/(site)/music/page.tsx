import MusicContent from "@/components/MusicContent";
import { getMusicReleases } from "@/sanity/queries";

export const revalidate = 60;

export default async function MusicPage() {
  const releases = await getMusicReleases();
  return <MusicContent releases={releases} />;
}
