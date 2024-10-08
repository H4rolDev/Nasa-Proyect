import mercuryImg from "../../img/mercury.jpg";
import venusImg from "../../img/venus.jpg";
import earthImg from "../../img/earth_dy.jpg";
import marsImg from "../../img/marte.jpg";
import jupiterImg from "../../img/jupiter.jpg";
import saturnImg from "../../img/saturn.jpg";
import uranusImg from "../../img/urano.jpg";
import neptuneImg from "../../img/neptune.jpg";

import mercurio from "../../img/mercurioIMG.png";
import venus from "../../img/venusIMG.png";
import tierra from "../../img/tierraIMG.png";
import marte from "../../img/marteIMG.png";
import jupiter from "../../img/jupiterIMG.png";
import saturno from "../../img/saturnoIMG.png";
import urano from "../../img/uranoIMG.png";
import neptuno from "../../img/neptunoIMG.png";

const planetsData = [
  {
    name: "Mercury",
    img: mercurio,
    texture: mercuryImg,
    size: 0.5,
    distance: 5,
    inclination: 7,
    eccentricity: 0.2056,
    orbitalPeriod: 88,
    position: { x: 57.9, y: 0, z: 0 },
    description: "Mercury is the closest planet to the Sun and the smallest in the Solar System. Due to its proximity, it has the fastest orbit, completing a full revolution around the Sun in just 88 Earth days. Its surface experiences extreme temperature variations, with scorching days and freezing nights.",
  }, // 88 days
  {
    name: "Venus",
    img: venus,
    texture: venusImg,
    size: 1,
    distance: 7,
    inclination: 3.39,
    eccentricity: 0.0067,
    orbitalPeriod: 225,
    position: { x: 108.2, y: 0, z: 0 },
    description: "Venus is often called Earth's twin because of its similar size and structure, but its thick, toxic atmosphere traps heat, making it the hottest planet in the Solar System. Venus has a slow, retrograde rotation, meaning it spins in the opposite direction to most planets.",
  }, // 225 days
  {
    name: "Earth",
    img: tierra,
    texture: earthImg,
    size: 1.2,
    distance: 10,
    inclination: 0,
    eccentricity: 0.0167,
    orbitalPeriod: 365.25,
    position: { x: 149.6, y: 0, z: 0 },
    description: "Earth is the only planet known to support life, with a unique atmosphere and liquid water on its surface. It has a stable climate due to the balance between its atmosphere, oceans, and the presence of a magnetic field that protects it from harmful solar radiation.",
  }, // 365.25 days
  {
    name: "Mars",
    img: marte,
    texture: marsImg,
    size: 0.7,
    distance: 13,
    inclination: 1.85,
    eccentricity: 0.0934,
    orbitalPeriod: 687,
    position: { x: 227.9, y: 0, z: 0 },
    description: "Mars, often called the 'Red Planet' because of its reddish appearance, is home to the largest volcano and the deepest canyon in the Solar System. Though cold and barren today, evidence suggests that Mars once had liquid water on its surface, raising questions about its past potential to support life.",
  }, // 687 days
  {
    name: "Jupiter",
    img: jupiter,
    texture: jupiterImg,
    size: 3,
    distance: 18,
    inclination: 1.31,
    eccentricity: 0.0489,
    orbitalPeriod: 11.86 * 365.25,
    position: { x: 778.3, y: 0, z: 0 },
    description: "Jupiter is the largest planet in the Solar System and is known for its massive storms, including the Great Red Spot, a storm larger than Earth. Jupiter is a gas giant, primarily composed of hydrogen and helium, and it has a strong magnetic field along with at least 79 moons.",
  }, // 11.86 years
  {
    name: "Saturn",
    img: saturno,
    texture: saturnImg,
    size: 2.5,
    distance: 23,
    inclination: 2.49,
    eccentricity: 0.0565,
    orbitalPeriod: 29.46 * 365.25,
    position: { x: 1427, y: 0, z: 0 },
    hasRings: true,
    description: "Saturn is famous for its stunning ring system, which is made up of ice, rock, and dust. This gas giant has a unique yellow hue due to ammonia crystals in its upper atmosphere, and like Jupiter, Saturn has a vast number of moons, including Titan, which has a thick atmosphere.",
  }, // 29.46 years
  {
    name: "Uranus",
    img: urano,
    texture: uranusImg,
    size: 1.5,
    distance: 28,
    inclination: 0.77,
    eccentricity: 0.0463,
    orbitalPeriod: 84 * 365.25,
    position: { x: 2871, y: 0, z: 0 },
    description: "Uranus is known for being the only planet that rotates on its side, likely due to a massive collision in its past. It has a faint ring system and a cold, icy atmosphere that gives it a blue-green color due to the presence of methane gas.",
  }, // 84 years
  {
    name: "Neptune",
    img: neptuno,
    texture: neptuneImg,
    size: 1.4,
    distance: 33,
    inclination: 1.77,
    eccentricity: 0.0086,
    orbitalPeriod: 164.8 * 365.25,
    position: { x: 4497.1, y: 0, z: 0 },
    description: "Neptune, the farthest planet from the Sun, is known for its deep blue color and strong winds, the fastest recorded in the Solar System. It is a cold and remote gas giant, and its atmosphere contains methane, giving it its striking blue color. Neptune has a faint ring system and several moons, including Triton.",
  }, // 164.8 years
];

export default planetsData;
