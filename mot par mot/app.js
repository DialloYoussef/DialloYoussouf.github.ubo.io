function annimateTitle(selector) {
  const title = document.querySelector(selector);
  if (title === null) {
    console.error(`Impossible de trouver l'element ${selector}`);
    return;
    // on verifie l'existence du titre
  }

  const spans = spanify(title);
  title.style.opacity = 1
  spans.forEach((span, k) => {
    span.children[0].style.animationDelay = k * 0.3 + "s";
  });
}

function spanify(element) {
  const children = Array.from(element.childNodes);
  //on recupere le contenu d'element sous forme de tableau  
  let spans = [];
  let elements = [];
  children.forEach((child) => {
    //   console.log(child);
    // là on teste le contenu de children 
    if (child.nodeType === Node.TEXT_NODE) {
      //si son contenu == à du texte on le recupere on le met dans une double span
      const words = child.textContent.split(" ");
      let wordSpan = words.map(wrapWord);
      spans = spans.concat(wordSpan);
      elements = elements.concat(
        inject(wordSpan, document.createTextNode(" "))
      );
    } else if (child.tagName === "BR") {
      elements.push(child);
    } else {
      spans = spans.concat(spanify(child));
      elements.push(child);
    }
  });
  //   console.log(elements);

  element.innerHTML = ``;
  elements.forEach((el) => {
    element.appendChild(el);
  });
  return spans;
}

//WRAPWORD : Permet de creer et de mettre chaque mot dans une double span 
function wrapWord(word) {
  const span = document.createElement("span");
  const span2 = document.createElement("span");
  span.appendChild(span2);
  span2.innerHTML = word;
  return span;
}

function inject(arr, elem) {
  return arr
    .map((item, k) => {
      if (k === arr.length - 1) {
        return [item];
      }
      return [item, elem.cloneNode()];
    })
    .reduce((acc, pair) => {
      acc = acc.concat(pair);
      return acc;
    }, []);
}

annimateTitle(".baniere_boite");
