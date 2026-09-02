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
import StartNowAffinityDiagram from "./start-now-affinity-diagram";
import PersonaCardsSection from "./persona-cards-section";
import BadgeBlockGrid from "./badge-block-grid";
import JourneyMap from "./journey-map";
import TextImageSplit from "./text-image-split";
import FeatureImageSplit from "./feature-image-split";
import RichTextImages from "./rich-text-images";
import IconFeatureGrid from "./icon-feature-grid";
import StatCards from "./stat-cards";
import StyleGuide from "./style-guide";
import ArchitectureMap from "./architecture-map";
import PrototypeEmbed from "./prototype-embed";
import InstagramSplit from "./instagram-split";
import ExternalCtaSection from "./external-cta-section";
import ImageMasonry from "./image-masonry";
import ImageMarquee from "./image-marquee";
import InspirationGrid from "./inspiration-grid";


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
    case "start-now-affinity-diagram":
      return <StartNowAffinityDiagram />
    case "persona-cards-section":
      return <PersonaCardsSection {...section} />
    case "badge-block-grid":
      return <BadgeBlockGrid {...section} />
    case "journey-map":
      return <JourneyMap {...section} />
    case "text-image-split":
      return <TextImageSplit {...section} />
    case "feature-image-split":
      return <FeatureImageSplit {...section} />
    case "rich-text-images":
      return <RichTextImages {...section} />
    case "icon-feature-grid":
      return <IconFeatureGrid {...section} />
    case "stat-cards":
      return <StatCards {...section} />
    case "style-guide":
      return <StyleGuide />
    case "architecture-map":
      return <ArchitectureMap {...section} />
    case "prototype-embed":
      return <PrototypeEmbed {...section} />
    case "instagram-split":
      return <InstagramSplit {...section} />
    case "external-cta":
      return <ExternalCtaSection {...section} />
    case "image-masonry":
      return <ImageMasonry {...section} />
    case "image-marquee":
      return <ImageMarquee {...section} />
    case "inspiration-section":
      return <InspirationGrid {...section} />
    default:
      return null;
  }
}
