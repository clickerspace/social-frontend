import cafe1 from "../../assets/img/game-bg/cafe/1.png";
import cafe2 from "../../assets/img/game-bg/cafe/2.png";
import cafe3 from "../../assets/img/game-bg/cafe/3.png";
import dormRooms1 from "../../assets/img/game-bg/dorm_rooms/1.png";
import dormRooms2 from "../../assets/img/game-bg/dorm_rooms/2.png";
import dormRooms3 from "../../assets/img/game-bg/dorm_rooms/3.png";
import market1 from "../../assets/img/game-bg/market/1.png";
import market2 from "../../assets/img/game-bg/market/2.png";
import schoolCampusYard1 from "../../assets/img/game-bg/school_campus_yard/1.png";
import schoolCampusYard2 from "../../assets/img/game-bg/school_campus_yard/2.png";
import schoolCampusYard3 from "../../assets/img/game-bg/school_campus_yard/3.png";

export type LocationKey =
  | "dorm_rooms"
  | "market"
  | "cafe"
  | "school_campus_yard";

const getKeyAndGiveRandomRelatedImg = (key: LocationKey) => {
  const keyAndImgs = {
    dorm_rooms: [dormRooms1, dormRooms2, dormRooms3],
    cafe: [cafe1, cafe2, cafe3],
    market: [market1, market2],
    school_campus_yard: [
      schoolCampusYard1,
      schoolCampusYard2,
      schoolCampusYard3,
    ],
  };
  console.log(keyAndImgs[key], key);
  return keyAndImgs[key][Math.floor(Math.random() * keyAndImgs[key].length)];
};

export default getKeyAndGiveRandomRelatedImg;
