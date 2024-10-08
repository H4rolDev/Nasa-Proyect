import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import planetsData from "./data/planetData"; // Importar los datos de los planetas
import ringImg from "../img/ring.png";
import sunImg from "../img/sun.jpg";
import "../App.css";
import TWEEN from "@tweenjs/tween.js";
let camera; // Mueve la cámara aquí, a nivel de componente

const SolarSystem = () => {
  const mountRef = useRef(null);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [timeScaleLabel, setTimeScaleLabel] = useState("Hour");
  const [selectedPlanet, setSelectedPlanet] = useState(null); // Estado para el planeta seleccionado
  const [planetsArray, setPlanets] = useState([]);
  const [cameraInitialPosition, setCameraInitialPosition] = useState({});

  
  // Determinar la escala de tiuempo basado en la velocidad
  const determineTimeScale = (multiplier) => {
    if (multiplier <= 1) return `${Math.round(multiplier)} Hour`; // 1 hora o menos
    if (multiplier <= 24) return `${Math.round(multiplier)} Hours`; // Hasta 24 horas
    if (multiplier <= 48) return `${Math.round(multiplier / 24)} Day`; // 1-2 días
    if (multiplier <= 365 * 24) return `${Math.round(multiplier / 24)} Days`; // Hasta 365 días
    if (multiplier <= 8760) return `${Math.round(multiplier / 24 / 365)} Year`; // Hasta 1 año
    return `${(multiplier / 8760).toFixed(2)} Years`; // Más de 1 año, muestra en años con decimales
  };

  useEffect(() => {
    const currentMountRef = mountRef.current;
    const scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    setCameraInitialPosition({ x: 0, y: 0, z: 150 });

    // Inicializar el renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMountRef.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    const textureLoader = new THREE.TextureLoader();

    // Crear fondo estrellado
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
      },
      vertexShader: `
        varying vec3 vColor;
        void main() {
          // Pasar el color al fragment shader
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = 10.0 * ( 280.0 / -mvPosition.z ); // Tamaño de las estrellas ajustado por la distancia
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
      varying vec3 vColor;

      // Función para crear el degradado circular del centro
      float circularGradient(vec2 coord, float radius) {
        vec2 centeredCoord = coord - vec2(0.5, 0.5); // Centrar las coordenadas
        float distance = length(centeredCoord);
        return 1.0 - smoothstep(0.0, radius, distance); // Degradado suave desde el centro
      }

      // Función para generar los picos puntiagudos
      float starSpikes(vec2 coord, float spikes, float sharpness) {
        vec2 centeredCoord = coord - vec2(0.5, 0.5);

        // Invertir el ángulo para girar los picos 180 grados
        float angle = atan(centeredCoord.y, centeredCoord.x) + 3.14159265; // Sumar pi (180 grados)

        float radius = length(centeredCoord);

        // Crear un patrón de pico puntiagudo utilizando cosenos y una función de poder para afilar
        float spikeEffect = pow(abs(cos(angle * spikes)), sharpness);

        // Ajustar el borde del pico para que sea más puntiagudo
        float edgeEffect = smoothstep(0.5, 0.0, radius);
        return spikeEffect * edgeEffect;
      }

      void main() {
        // Crear el degradado suave del círculo central
        float centerCircle = circularGradient(gl_PointCoord, 0.35); // Tamaño del círculo central

        // Generar las puntas puntiagudas con 6 picos (ajustable)
        float spikes = starSpikes(gl_PointCoord, 2.0, 10.0); // Número de puntas y agudeza

        // Combinar el círculo con los picos puntiagudos
        float shape = max(centerCircle, spikes); // Mantener el círculo y añadir picos

        // Aplicar un difuminado general hacia los bordes (intensidad se desvanece)
        shape *= 1.0 - length(gl_PointCoord - vec2(0.5, 0.5)); // Difuminación en los bordes

        // Aplicar el color de la estrella
        vec4 starColor = vec4(vColor, shape);

        if (starColor.a < 0.05) discard; // Descartar píxeles con baja opacidad
        gl_FragColor = starColor;
        }`,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true,
    });

    // Crear geometría y color de las estrellas
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    const starColors = [];

    for (let i = 0; i < 7000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starVertices.push(x, y, z);

      // Generar colores pastel para las estrellas
      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.7, 0.9); // Colores brillantes y suaves
      starColors.push(color.r, color.g, color.b);
    }

    // Añadir los atributos a la geometría de las estrellas
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    starGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(starColors, 3)
    );

    // Crear el objeto Points para las estrellas
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Crear el sol
    const geometrySun = new THREE.SphereGeometry(3, 32, 32);
    const materialSun = new THREE.MeshBasicMaterial({
      map: textureLoader.load(sunImg),
    });
    const sun = new THREE.Mesh(geometrySun, materialSun);
    scene.add(sun);

    const sunLight = new THREE.PointLight(0xffffff, 900, 500);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const planets = [];

    planetsData.forEach((planetData) => {
      const geometryPlanet = new THREE.SphereGeometry(planetData.size, 32, 32);
      const texturePlanet = new THREE.TextureLoader().load(planetData.texture);
      const materialPlanet = new THREE.MeshPhongMaterial({
        map: texturePlanet,
      });
      const planet = new THREE.Mesh(geometryPlanet, materialPlanet);

      const distanceAtPerihelion =
        planetData.distance * (1 - planetData.eccentricity);
      planet.position.set(
        distanceAtPerihelion, // posición X calculada
        planetData.position.y, // mantener Y desde planetData
        planetData.position.z // mantener Z desde planetData
      );

      scene.add(planet);

      // Almacenar el planeta para interacción futura
      planetData.mesh = planet;

      // Añadir el planeta a la escena
      planets.push({ mesh: planet, ...planetData });

      // Crear la órbita
      const curve = new THREE.EllipseCurve(
        0,
        0,
        planetData.distance * (1 + planetData.eccentricity),
        planetData.distance * (1 - planetData.eccentricity),
        0,
        2 * Math.PI,
        false,
        THREE.MathUtils.degToRad(planetData.inclination)
      );

      setPlanets(planetsArray);

      const points = curve.getPoints(50);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
      orbit.rotation.x = THREE.MathUtils.degToRad(90);
      scene.add(orbit);

      // Añadir anillos de Saturno
      if (planetData.hasRings) {
        const ringGeometry = new THREE.RingGeometry(3, 4, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
          map: textureLoader.load(ringImg),
          side: THREE.DoubleSide,
          transparent: true,
        });

        const uv = ringGeometry.attributes.uv;
        for (let i = 0; i < uv.count; i++) {
          const u = uv.getX(i);
          const angle = u * Math.PI * 2;
          const newU = Math.cos(angle) * 0.5 + 0.5;
          const newV = Math.sin(angle) * 0.5 + 0.5;
          uv.setXY(i, newU, newV);
        }
        uv.needsUpdate = true;

        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = THREE.MathUtils.degToRad(90);
        planet.add(ring);
      }
      planetsArray.push({ mesh: planet, ...planetData });
    });

    setPlanets(planetsArray);
    camera.position.set(0, 0, 150);

    const animate = () => {
      requestAnimationFrame(animate);

      planets.forEach(({ mesh, distance, eccentricity, orbitalPeriod }) => {
        // Convertir el período orbital en un factor de velocidad
        const time = Date.now() * 0.0001 * speedMultiplier;
        const orbitalSpeed = (2 * Math.PI) / orbitalPeriod; // Velocidad angular (rad/s) inversamente proporcional al período orbital
        const angle = time * orbitalSpeed; // Angulo basado en la velocidad orbital y el tiempo
        const radiusX = distance * (1 + eccentricity);
        const radiusY = distance * (1 - eccentricity);

        mesh.position.x = radiusX * Math.cos(angle);
        mesh.position.z = radiusY * Math.sin(angle);

        // Rotación del planeta
        mesh.rotation.y += 0.01 * speedMultiplier;
      });

      TWEEN.update(performance.now());
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Funcion para determinar la escala de tiempo basada en la velocidad

    return () => {
      if (currentMountRef) {
        currentMountRef.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [planetsArray, speedMultiplier]);


  
  useEffect(() => {
    setTimeScaleLabel(determineTimeScale(speedMultiplier));
  }, [speedMultiplier]);

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
    
    // Mover la cámara al planeta seleccionado, pero sin eliminarlo de la escena
    const newCameraPosition = {
      x: planet.mesh.position.x + planet.size * 5,
      y: planet.mesh.position.y + planet.size * 5,
      z: planet.mesh.position.z + planet.size * 5,
    };

    new TWEEN.Tween(camera.position)
      .to(newCameraPosition, 2000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        camera.lookAt(planet.mesh.position);
      })
      .start();
  };

  const resetCameraPosition = () => {
    setSelectedPlanet(null);
    
    new TWEEN.Tween(camera.position)
      .to(cameraInitialPosition, 2000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  };

  return (
    <div className="solar-system">
      <div
        ref={mountRef}
        className="threejs-container"
        style={{ width: "100%", height: "100vh" }}
      ></div>

      {selectedPlanet && (
        <div
          className="planet-info"
          style={{
            position: "absolute",
            right: "5%",
            top: "5%",
            width: "30%",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo negro semi-transparente
            color: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2 className="titleInfo">{selectedPlanet.name}</h2>
          <img className="imgPlanetsSystemSolar" src={selectedPlanet.img} alt={selectedPlanet.name}></img>
          <p className="descriptionSystemSolarInPlanet">{selectedPlanet.description}</p>
        </div>
      )}

      <div className="planet-buttons">
        {planetsData.map((planet) => (
          <button
            key={planet.name}
            className={`planet-button ${
              selectedPlanet?.name === planet.name ? "zoom-in" : ""
            }`}
            onClick={() => handlePlanetClick(planet)}
          >
            {planet.name}
          </button>
        ))}
        {selectedPlanet && (
          <button onClick={resetCameraPosition} className="exit-button">
            Back to space
          </button>
        )}
      </div>
      <div className="controls">
        <label>Speed of the solar system (Simulated Time):</label>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}>
          {timeScaleLabel}
        </div>
        <input
          type="range"
          min="1"
          max="8760"
          step="1"
          value={speedMultiplier}
          onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default SolarSystem;
