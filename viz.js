
// Dimensiones del gráfico
const ancho = 1200;
const alto = 800;
const margen = { superior: 20, derecho: 20, inferior: 30, izquierdo: 30 };
const anchoGrafico = ancho - margen.izquierdo - margen.derecho;
const altoGrafico = alto - margen.superior - margen.inferior;

// Crear grupos SVG
const svg1 = d3.select("#vis-1")
  .append("svg")
  .attr("width", ancho)
  .attr("height", alto)
  .attr("style", "border: 1px solid blue");
svg1.style("background-color", "white");

const svg2 = d3.select("#vis-2")
  .append("svg")
  .attr("width", ancho)
  .attr("height", alto)
  .attr("style", "border: 1px solid blue");
svg2.style("background-color", "white");
const svg3 = d3.select("#vis-3")

  .append("svg")
  .attr("width", ancho)
  .attr("height", alto)
  .attr("style", "border: 1px solid blue");
svg3.style("background-color", "white");

// Datos
const datos = [
  { equipo: "McLaren", valores: [14.0, 24.0, 28.0, 34.0, 42.0, 53.0, 53.0, 58.0, 72.0] },
  { equipo: "BMW", valores: [8.0, 19.0, 30.0, 35.0, 44.0, 52.0, 70.0, 74.0, 82.0] },
  { equipo: "Williams", valores: [9.0, 9.0, 10.0, 12.0, 13.0, 15.0, 15.0, 15.0, 16.0] },
  { equipo: "Renault", valores: [5.0, 6.0, 6.0, 6.0, 9.0, 9.0, 9.0, 12.0, 15.0] },
  { equipo: "Toro Rosso", valores: [2.0, 2.0, 2.0, 2.0, 2.0, 6.0, 7.0, 7.0, 7.0] },
  { equipo: "Ferrari", valores: [1.0, 11.0, 29.0, 47.0, 63.0, 69.0, 73.0, 91.0, 96.0] },
  { equipo: "Toyota", valores: [0.0, 5.0, 8.0, 9.0, 9.0, 9.0, 17.0, 23.0, 25.0] },
  { equipo: "Red Bull", valores: [0.0, 2.0, 4.0, 8.0, 10.0, 15.0, 21.0, 24.0, 24.0] },
  { equipo: "Honda", valores: [0.0, 0.0, 0.0, 3.0, 3.0, 6.0, 8.0, 8.0, 14.0] }
];

// Colores para las líneas
const colores = d3.scaleOrdinal(d3.schemeCategory10);

// Escala X
const escalaX = d3.scaleLinear()
  .domain([0, datos[0].valores.length - 1])
  .range([0, anchoGrafico]);

// Escala Y
const escalaY = d3.scaleLinear()
  .domain([0, d3.max(datos, d => d3.max(d.valores))])
  .range([altoGrafico, 0]);

// Generar línea
const linea = d3.line()
  .x((d, i) => escalaX(i))
  .y(d => escalaY(d));

// Crear grupo para el gráfico
const grafico = svg1.append("g")
  .attr("transform", `translate(${margen.izquierdo},${margen.superior})`);

// Agregar líneas al gráfico
grafico.selectAll(".linea")
  .data(datos)
  .enter()
  .append("path")
  .attr("class", "linea")
  .attr("d", d => linea(d.valores))
  .attr("fill", "none")
  .attr("stroke", (d, i) => colores(i))
  .attr("stroke-width", 2);

// Agregar puntos a cada dato
grafico.selectAll(".punto")
  .data(datos)
  .enter()
  .selectAll("circle")
  .data(d => d.valores)
  .enter()
  .append("circle")
  .attr("class", "punto")
  .attr("cx", (d, i) => escalaX(i))
  .attr("cy", d => escalaY(d))
  .attr("r", 3)
  .attr("fill", "black");

// Agregar ejes
grafico.append("g")
  .attr("transform", `translate(0, ${altoGrafico})`)
  .call(d3.axisBottom(escalaX));

grafico.append("g")
  .call(d3.axisLeft(escalaY));

// Estilo de los ejes
grafico.selectAll("g.axis g.tick line")
  .attr("stroke", "gray")
  .attr("stroke-dasharray", "3,3");

grafico.selectAll("g.axis path.domain")
  .attr("stroke", "gray");