import randomAlgorithm from "./data/algorithms";

export default function RenderAlgorithm(props) {
  let algorithm;
  if(props.typeTest === "random-algorithm"){
    algorithm = randomAlgorithm.algorithm
  }
  let alNoSpace = algorithm.replace(/ {4}/g, '').split('');
  algorithm = algorithm.split('');

  let i = 0;
  return (
    <p className={`text-noStyle relative`} style={{ top: `${-props.paddingTop}px` }}>
      {algorithm.map((character, index) => {
        return (
          character === '\n'
            ? <span key={index} id={`letter_${i++}`}>⏎<br /></span>
            : character !== alNoSpace[i]
              ? <span id="space" key={index}>&nbsp;</span>
              : <span id={`letter_${i++}`} key={index}>{character}</span>
        )

      })}
    </p>
  )
}

