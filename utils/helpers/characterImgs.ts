// each charater has 2 images
import celine1 from "../../assets/img/characters/celine1.png";
import celine2 from "../../assets/img/characters/celine2.png";
import david1 from "../../assets/img/characters/david1.png";
import david2 from "../../assets/img/characters/david2.png";
import denise1 from "../../assets/img/characters/denise1.png";
import denise2 from "../../assets/img/characters/denise2.png";
import dimitri1 from "../../assets/img/characters/dimitri1.png";
import dimitri2 from "../../assets/img/characters/dimitri2.png";
import erica1 from "../../assets/img/characters/erica1.png";
import erica2 from "../../assets/img/characters/erica2.png";
import katia1 from "../../assets/img/characters/katia1.png";
import katia2 from "../../assets/img/characters/katia2.png";
import linea1 from "../../assets/img/characters/linea1.png";
import linea2 from "../../assets/img/characters/linea2.png";
import souleiman1 from "../../assets/img/characters/souleiman1.png";
import souleiman2 from "../../assets/img/characters/souleiman2.png";
import victor1 from "../../assets/img/characters/victor1.png";
import victor2 from "../../assets/img/characters/victor2.png";
import yohanna1 from "../../assets/img/characters/yohanna1.png";
import yohanna2 from "../../assets/img/characters/yohanna2.png";

export const splideCharacterData = [
  {
    key: "celine",
    name: "Celine",
    img: celine1,
  },
  {
    key: "david",
    name: "David",
    img: david1,
  },
  {
    key: "denise",
    name: "Denise",
    img: denise1,
  },
  {
    key: "dimitri",
    name: "Dimitri",
    img: dimitri1,
  },
  {
    key: "erica",
    name: "Erica",
    img: erica1,
  },
  {
    key: "katia",
    name: "Katia",
    img: katia1,
  },
  {
    key: "linea",
    name: "Linea",
    img: linea1,
  },
  {
    key: "souleiman",
    name: "Souleiman",
    img: souleiman1,
  },
  {
    key: "victor",
    name: "Victor",
    img: victor1,
  },
  {
    key: "yohanna",
    name: "Yohanna",
    img: yohanna1,
  },
];

export type CharacterKeys =
  | "celine"
  | "david"
  | "denise"
  | "dimitri"
  | "erica"
  | "katia"
  | "linea"
  | "souleiman"
  | "victor"
  | "yohanna";

const getKeyAndGiveRandomRelatedCharacterImg = (key: CharacterKeys) => {
  const keyAndImgs = {
    celine: [celine1, celine2],
    david: [david1, david2],
    denise: [denise1, denise2],
    dimitri: [dimitri1, dimitri2],
    erica: [erica1, erica2],
    katia: [katia1, katia2],
    linea: [linea1, linea2],
    souleiman: [souleiman1, souleiman2],
    victor: [victor1, victor2],
    yohanna: [yohanna1, yohanna2],
  };
  return keyAndImgs[key.toLowerCase() as CharacterKeys][
    Math.floor(
      Math.random() * keyAndImgs[key.toLowerCase() as CharacterKeys].length,
    )
  ];
};
export default getKeyAndGiveRandomRelatedCharacterImg;
