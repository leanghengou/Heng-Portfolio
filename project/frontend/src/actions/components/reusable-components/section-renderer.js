import Hero from "../reusable-components/hero";
import Gallery from "../reusable-components/gallery";
import MultiBubbleText from "../reusable-components/multi-buble-text-box"
import MultiGalleryBlocks from "./multi-gallery-block";


export default function SectionRenderer({ section }) {
  switch (section.type) {
    case "hero":
      return <Hero {...section} />;
    case "gallery":
      return <Gallery {...section} />;
    case "bubble-text-badge":
      return <MultiBubbleText {...section} />;
      case "multi-gallery-blocks":
      return <MultiGalleryBlocks {...section} />;
    default:
      return null;
  }
}