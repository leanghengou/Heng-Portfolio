import styled from "styled-components";
import "./reusable-components.css";

export default function MultiBubbleText({ title, content }) {
  return (
    <section className="startnow-multi-buble-text project-section-margin">
      <h2 className="project-section-title">{title}</h2>
      <MultiBallContainer>
        {content.map((item, key) => (
            <BallItem className="ball-item-style" key={key}>
              <BallNum>{key + 1}</BallNum>
              <p>{item}</p></BallItem>
        ))}
      </MultiBallContainer>
    
    </section>
  );
}

const MultiBallContainer = styled.div`
display:flex;
gap:20px;
flex-wrap: wrap;
justify-content: center;
`
const BallNum = styled.h5`
margin:5px;
font-size:22px;
font-weight:400;
`
const BallItem = styled.div`

`

