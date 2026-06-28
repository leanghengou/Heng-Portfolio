import "./reusable-components.css";

const failGroups = [
  {
    title: "Payment",
    notes: [
      "Ask for payment for classes",
      "Ask for payment immeditely",
      "Expectation fail and price too high (subcribtion)",
      "App that ask for subcribe pay immediately",
      "Ask for money",
      "Not popular, ask for register and pay money",
    ],
  },
  {
    title: "Others",
    notes: [
      "Some fitness app doesnt have animation like no picture to teach on how to workout",
      "Most fitness app are liars, they put too high expectation, no customization",
      "Personally, I think the lack of motivation that drives people to stop using the app.",
    ],
  },
];

const successGroups = [
  {
    title: "Affordable",
    notes: [
      "Low price, affordable",
      "Affordable, be able to set flexible schedule",
      "affordable, provide free trail for new customers",
    ],
  },
  {
    title: "Interest",
    notes: [
      "How to workout in the right way, good food plan",
      "The app that is convenient and doesn't need a lot of equipments",
      "Guide me to workout by video for certain type of muscle or body parts",
      "Have level for workout like beginner, advance, pro, schedule routine",
      "effective workout class,",
      "Help people know how to workout, updated your health, schedule your time for workout well.",
    ],
  },
  {
    title: "Good Features",
    notes: [
      "A reward system, customizable",
      "It can track a person's achievement. I feel motivated to do more when seeing a specific goal",
      "Influencers, inspiration, make trsust, new update, lives, streaming",
      "Help keep track on fitness, can create healthy plan meal and drink, can crate ur own routine.",
      "good eating plan, lives feature, schedule routine",
      "time schedule, food plan",
    ],
  },
];

function StickyNote({ children, isHighlighted }) {
  return (
    <div className={"affinity-note"}>
      {children}
    </div>
  );
}

function AffinityGroup({ group, highlightText }) {
  return (
    <div className="affinity-group">
      <h3>{group.title}</h3>
      <div className="affinity-notes-grid">
        {group.notes.map((note) => (
          <StickyNote key={note} isHighlighted={note === highlightText}>
            {note}
          </StickyNote>
        ))}
      </div>
    </div>
  );
}

function AffinityBlock({ question, groups, highlightText }) {
  return (
    <div className="affinity-block">
      <h2>{question}</h2>
      <div className="affinity-groups">
        {groups.map((group) => (
          <AffinityGroup group={group} highlightText={highlightText} key={group.title} />
        ))}
      </div>
    </div>
  );
}

export default function StartNowAffinityDiagram() {
  return (
    <section className="startnow-affinity-section">
      <AffinityBlock question={'"Why fitness app fail?"'} groups={failGroups} />
      <AffinityBlock
        question={'"Why fitness app successful?"'}
        groups={successGroups}
        highlightText="Help keep track on fitness, can create healthy plan meal and drink, can crate ur own routine."
      />
    </section>
  );
}
