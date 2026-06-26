import Hero from "../reusable-components/hero";
import Gallery from "../reusable-components/gallery";
import MultiBubbleText from "../reusable-components/multi-buble-text-box"
import MultiGalleryBlocks from "./multi-gallery-block";
import RichTextSection from "./rich-text-section";
import CircleImageCards from "./circle-image-cards";
import BorderedTextCards from "./bordered-text-cards";
import ResearchStatsSection from "./research-stats-section";
import SurveyResultsSection from "./survey-results-section";
import SurveyCardsCarousel from "./survey-cards-carousel";


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
    case "rich-text-section":
      return <RichTextSection {...section} />
    case "circle-image-cards":
      return <CircleImageCards {...section} />
    case "bordered-text-cards":
      return <BorderedTextCards {...section} />
    case "research-stats-section":
      return <ResearchStatsSection {...section} />
    case "survey-results-section":
      return <SurveyResultsSection {...section} />
    case "survey-cards-carousel":
      return <SurveyCardsCarousel {...section} />
    default:
      return null;
  }
}
