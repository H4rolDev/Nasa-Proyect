import React, { useState } from "react";
import Planeta from "./components/Planeta";
import Menus from "./components/Menus";
import Astronauta from "./components/Astronauta";
import "./Presentacion.css";

const planetas = [  
  { 
    nombre: "The Sun", 
    descripcion: "The Sun is the star of our solar system, providing the necessary light and heat to support life on Earth. It is a massive ball of hydrogen and helium undergoing nuclear fusion at its core.", 
    calendario: "On June 21, the Summer Solstice marks the longest day of the year in the Northern Hemisphere, thanks to the Sun’s tilt. In 2024, a total solar eclipse will be visible across parts of North America, providing a rare celestial spectacle.", 
    exploraciones: "Explorations of the Sun have been conducted by missions like the Parker Solar Probe, which is studying the outer corona to understand solar wind and magnetic fields.", 
    curiosidades: "The Sun accounts for about 99.86% of the mass of the solar system. A single solar flare can release as much energy as billions of atomic bombs.", 
    masInformacion: "https://solarsystem.nasa.gov/solar-system/sun/overview/"
  },
  { 
    nombre: "Mercury", 
    descripcion: "Mercury is the closest planet to the Sun and is known for its extreme temperature fluctuations due to its thin atmosphere. It experiences scorching daytime temperatures and freezing nights.", 
    calendario: "In May 2025, Mercury will transit the Sun—a rare event where the planet passes directly between the Sun and Earth, visible as a tiny dot moving across the Sun's surface.", 
    exploraciones: "Mercury has been explored by Mariner 10 and MESSENGER missions. BepiColombo, a joint mission between ESA and JAXA, is currently en route to study the planet in greater detail.", 
    curiosidades: "Mercury has no moons and is the smallest planet in the solar system. It has a large iron core, which generates a magnetic field, though much weaker than Earth's.", 
    masInformacion: "https://solarsystem.nasa.gov/planets/mercury/overview/"
  },
  { 
    nombre: "Venus", 
    descripcion: "Venus is the second planet from the Sun and is known for its thick, toxic atmosphere dominated by carbon dioxide, leading to extreme greenhouse gas effects and surface temperatures hot enough to melt lead.", 
    calendario: "In 2027, Venus will shine as the brightest object in the night sky, often referred to as the 'Evening Star'. Venus is at its maximum brightness during its greatest elongation from the Sun.", 
    exploraciones: "The Soviet Venera program landed several probes on Venus, and NASA's Magellan mission mapped its surface using radar. Future missions, like VERITAS and DAVINCI, aim to study Venus in greater detail.", 
    curiosidades: "Venus is often called Earth's 'sister planet' due to its similar size and composition. However, its surface pressure is 92 times that of Earth.", 
    masInformacion: "https://solarsystem.nasa.gov/planets/venus/overview/"
  },
  { 
    nombre: "Earth", 
    descripcion: "Earth is the third planet from the Sun and the only known planet that supports life, with a diverse range of ecosystems, water, and an atmosphere composed mainly of nitrogen and oxygen.", 
    calendario: "On April 8, 2024, a total solar eclipse will be visible across parts of North America. This rare event will momentarily plunge daylight into darkness, offering a dramatic celestial experience.", 
    exploraciones: "Earth is continuously monitored through satellite observations, including missions like Landsat and the Global Precipitation Measurement (GPM) mission. Human space exploration also allows us to study Earth from orbit.", 
    curiosidades: "Earth has one natural satellite, the Moon, which is believed to have formed after a massive collision between Earth and a Mars-sized body. About 70% of Earth's surface is covered in water.", 
    masInformacion: "https://solarsystem.nasa.gov/planets/earth/overview/"
  },
  { 
    nombre: "Mars", 
    descripcion: "Mars, often called the Red Planet due to its iron oxide-rich surface, has vast deserts, mountains, and the largest volcano and canyon in the solar system.", 
    calendario: "In October 2024, Mars will come into opposition, meaning it will be directly opposite the Sun in the sky, offering the best views of the planet through a telescope.", 
    exploraciones: "Explorations of Mars have included numerous missions like the Viking landers, Spirit and Opportunity rovers, and the current Perseverance rover, which is searching for signs of ancient life.", 
    curiosidades: "Mars has two small moons, Phobos and Deimos, which may be captured asteroids. Scientists are working on missions to bring samples from Mars back to Earth.", 
    masInformacion: "https://solarsystem.nasa.gov/planets/mars/overview/"
  },
  { 
    nombre: "Jupiter", 
    descripcion: "Jupiter is the largest planet in the solar system, known for its many moons and the Great Red Spot, a massive storm that has been raging for centuries.", 
    calendario: "In 2023, Jupiter reached opposition on November 3rd, making it incredibly bright and visible all night long. Watch for the next close approach in 2024 for stunning views through telescopes.", 
    exploraciones: "Jupiter has been explored by missions like Pioneer, Voyager, and the Juno mission, which is currently studying the planet's atmosphere and magnetosphere.", 
    curiosidades: "Jupiter has a strong magnetic field and radiation belts, and it has at least 79 moons, including the four large Galilean moons: Io, Europa, Ganymede, and Callisto.", 
    masInformacion: "https://solarsystem.nasa.gov/planets/jupiter/overview/"
  },
  { 
    nombre: "Saturn", 
    descripcion: "Saturn is famous for its stunning ring system, which is made of ice and rock particles. It is a gas giant composed primarily of hydrogen and helium.", 
    calendario: "Saturn’s rings will be at their best visibility in 2025, as the planet reaches opposition. At this time, Saturn will be closest to Earth, and the rings will appear wide open for excellent viewing.", 
    exploraciones: "Saturn has been explored by Pioneer 11, Voyager 1 and 2, and the Cassini spacecraft, which studied the planet, its rings, and its moons in detail for over 13 years.", 
    curiosidades: "Saturn could float in water because it is mostly made of gas. Its moon, Titan, is the only moon in the solar system with a thick atmosphere.", 
    masInformacion: "https://solarsystem.nasa.gov/planets/saturn/overview/"
  },
  { 
    nombre: "Uranus", 
    descripcion: "Uranus is known for its unique tilt, rotating on its side compared to other planets in the solar system. It is an ice giant with a cold atmosphere of hydrogen, helium, and methane.", 
    calendario: "In 2033, Uranus will be at opposition, offering the best views of the planet as it aligns with Earth and the Sun. Though faint, it can be seen through small telescopes.", 
    exploraciones: "Uranus has only been visited by one spacecraft, Voyager 2, which flew by in 1986. Scientists hope to send more missions to study its moons and rings.", 
    curiosidades: "Uranus is often referred to as an 'ice giant' because it has more 'ices' like water, ammonia, and methane compared to Jupiter and Saturn.", 
    masInformacion: "https://solarsystem.nasa.gov/planets/uranus/overview/"
  },
  { 
    nombre: "Neptune", 
    descripcion: "Neptune is the eighth and farthest planet from the Sun, known for its striking blue color and incredibly strong winds.", 
    calendario: "In September 2024, Neptune will reach opposition, offering its brightest appearance as it comes closest to Earth. This is the best time to view the distant planet.", 
    exploraciones: "Neptune was visited by Voyager 2 in 1989, providing our only close-up images of the planet. Future missions to study Neptune and its moons are being considered.", 
    curiosidades: "Neptune has the fastest winds in the solar system, reaching speeds of up to 2,100 kilometers per hour. Its largest moon, Triton, has geysers that spew nitrogen gas.", 
    masInformacion: "https://solarsystem.nasa.gov/planets/neptune/overview/"
  }
];



function Presentacion() {
  const [planetaActual, setPlanetaActual] = useState(0);

  const siguientePlaneta = () => {
    if (planetaActual < planetas.length - 1) {
      setPlanetaActual(planetaActual + 1);
    } else {
      window.location.href = "/pagina-3d"; // Redirige a la página 3D
    }
  };

  const anteriorPlaneta = () => {
    if (planetaActual > 0) {
      setPlanetaActual(planetaActual - 1);
    }
  };

  return (
    <div className="presentacion-container">
      <Astronauta
        planeta={planetas[planetaActual].nombre}
        descripcion={planetas[planetaActual].descripcion}
      />
      <Planeta nombre={planetas[planetaActual].nombre} />
      <Menus planeta={planetas[planetaActual]} />

      <div className="botones-container">
        <button
          className="btn-anterior"
          onClick={anteriorPlaneta}
          disabled={planetaActual === 0}
        >
          Previous
        </button>
        <button className="btn-siguiente" onClick={siguientePlaneta}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Presentacion;
