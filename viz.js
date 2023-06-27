
// Dimensiones del gráfico
const ancho = 1200;
const alto = 800;
const margen = { superior: 40, derecho: 40, inferior: 40, izquierdo: 40 };
const margen_2 = { superior: 5, derecho: 40, inferior: 5, izquierdo: 40 };
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
  .attr("stroke-width", 4);  

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
  .attr("fill", "rgba(0, 0, 0, 0.75)"); 

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


///////

// Driver data
const driverData = [
  { driverId: "Lewis Hamilton", mean_seconds: 90 },
  { driverId: "Nick Heidfeld", mean_seconds: 91 },
  { driverId: "Nico Rosberg", mean_seconds: 91 },
  { driverId: "Fernando Alonso", mean_seconds: 91 },
  { driverId: "Heikki Kovalainen", mean_seconds: 90 },
  { driverId: "Kazuki Nakajima", mean_seconds: 100 },
  { driverId: "Sebastien Bourdais", mean_seconds: 96 },
  { driverId: "Kimi Raikkonen", mean_seconds: 90 },
  { driverId: "Robert Kubica", mean_seconds: 90 },
  { driverId: "Timo Glock", mean_seconds: 101 },
  { driverId: "Nelson Piquet Jr", mean_seconds: 94 },
  { driverId: "David Coulthard", mean_seconds: 92 },
  { driverId: "Jarno Trulli", mean_seconds: 90 },
  { driverId: "Mark Webber", mean_seconds: 90 },
  { driverId: "Jenson Button", mean_seconds: 93 },
  { driverId: "Anthony Davidson", mean_seconds: 101 },
  { driverId: "Sebastian Vettel", mean_seconds: 90 },
  { driverId: "Rubens Barrichello", mean_seconds: 92 },
  { driverId: "Giancarlo Fisichella", mean_seconds: 92 },
  { driverId: "Felipe Massa", mean_seconds: 91 },
];

// Crear grupo para el gráfico del histograma
const histograma = svg2.append("g")
  .attr("transform", `translate(${margen_2.izquierdo},${margen_2.superior})`);

// Obtener los valores del campo mean_seconds en un arreglo plano
const valoresHistograma = driverData.map(d => d.mean_seconds);

// Create a scale for the X-axis of the histogram
const escalaXHistograma = d3.scaleBand()
  .domain(driverData.map(d => d.driverId))
  .range([0, anchoGrafico])
  .padding(0.1);

// Create a scale for the Y-axis of the histogram
const escalaYHistograma = d3.scaleLinear()
  .domain([85, d3.max(driverData, d => d.mean_seconds)])
  .range([altoGrafico, 0]);

// Add the bars to the histogram
histograma.selectAll(".barra")
  .data(driverData)
  .enter()
  .append("rect")
  .attr("class", "barra")
  .attr("x", d => escalaXHistograma(d.driverId))
  .attr("y", d => escalaYHistograma(d.mean_seconds))
  .attr("width", escalaXHistograma.bandwidth())
  .attr("height", d => altoGrafico - escalaYHistograma(d.mean_seconds))
  .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

// Add X-axis
histograma.append("g")
  .attr("transform", `translate(0, ${altoGrafico})`)
  .call(d3.axisBottom(escalaXHistograma))
  .selectAll("text")
  .attr("transform", "rotate(-45)")
  .style("text-anchor", "end");

// Add Y-axis
histograma.append("g")
  .call(d3.axisLeft(escalaYHistograma));

// Style the histogram axes
histograma.selectAll("g.axis g.tick line")
  .attr("stroke", "gray")
  .attr("stroke-dasharray", "3,3");

histograma.selectAll("g.axis path.domain")
  .attr("stroke", "gray");


////////////

// Create group for the boxplots
const boxplots = svg3.append("g")
  .attr("transform", `translate(${margen.izquierdo},${margen.superior})`);

// Calculate boxplot statistics for each data point
const boxplotData = datos.map(d => {
  const sortedValues = d.valores.sort(d3.ascending);
  const q1 = d3.quantile(sortedValues, 0.25);
  const median = d3.quantile(sortedValues, 0.5);
  const q3 = d3.quantile(sortedValues, 0.75);
  const iqr = q3 - q1;
  const min = q1 - 1.5 * iqr;
  const max = q3 + 1.5 * iqr;
  return { equipo: d.equipo, values: sortedValues, q1, median, q3, min, max };
});

// Create a scale for the X-axis of the boxplots
const escalaXBoxplots = d3.scaleBand()
  .domain(boxplotData.map(d => d.equipo))
  .range([0, anchoGrafico])
  .padding(0.1);

// Create a scale for the Y-axis of the boxplots
const escalaYBoxplots = d3.scaleLinear()
  .domain([0, d3.max(datos.flatMap(d => d.valores))]) // Update the domain
  .range([altoGrafico, 0]);

// Add the boxes to the boxplots
boxplots.selectAll(".box")
  .data(boxplotData)
  .enter()
  .append("rect")
  .attr("class", "box")
  .attr("x", d => escalaXBoxplots(d.equipo))
  .attr("y", d => escalaYBoxplots(d.q3))
  .attr("width", escalaXBoxplots.bandwidth())
  .attr("height", d => escalaYBoxplots(d.q1) - escalaYBoxplots(d.q3))
  .attr("fill", "lightgray");

boxplots.selectAll(".median-line")
  .data(boxplotData)
  .enter()
  .append("line")
  .attr("class", "median-line")
  .attr("x1", d => escalaXBoxplots(d.equipo))
  .attr("x2", d => escalaXBoxplots(d.equipo) + escalaXBoxplots.bandwidth())
  .attr("y1", d => escalaYBoxplots(d.median))
  .attr("y2", d => escalaYBoxplots(d.median))
  .attr("stroke", "black")
  .attr("stroke-width", 2);

// Add the whiskers to the boxplots
boxplots.selectAll(".whisker")
  .data(boxplotData)
  .enter()
  .append("line")
  .attr("class", "whisker")
  .attr("x1", d => escalaXBoxplots(d.equipo) + escalaXBoxplots.bandwidth() / 2)
  .attr("x2", d => escalaXBoxplots(d.equipo) + escalaXBoxplots.bandwidth() / 2)
  .attr("y1", d => escalaYBoxplots(Math.min(d.max, d3.max(d.values))))
  .attr("y2", d => escalaYBoxplots(Math.max(d.min, d3.min(d.values))))
  .attr("stroke", "black")
  .attr("stroke-width", 1)
  .attr("stroke-dasharray", "4");

// Add horizontal lines for the maximum and minimum values (shorter lines)
const lineLength = escalaXBoxplots.bandwidth() * 0.4; // Adjust the line length as needed

boxplots.selectAll(".max-line")
  .data(boxplotData)
  .enter()
  .append("line")
  .attr("class", "max-line")
  .attr("x1", d => escalaXBoxplots(d.equipo) + escalaXBoxplots.bandwidth() / 2 - lineLength / 2)
  .attr("x2", d => escalaXBoxplots(d.equipo) + escalaXBoxplots.bandwidth() / 2 + lineLength / 2)
  .attr("y1", d => escalaYBoxplots(Math.min(d.max, d3.max(d.values))))
  .attr("y2", d => escalaYBoxplots(Math.min(d.max, d3.max(d.values))))
  .attr("stroke", "black")
  .attr("stroke-width", 1);

boxplots.selectAll(".min-line")
  .data(boxplotData)
  .enter()
  .append("line")
  .attr("class", "min-line")
  .attr("x1", d => escalaXBoxplots(d.equipo) + escalaXBoxplots.bandwidth() / 2 - lineLength / 2)
  .attr("x2", d => escalaXBoxplots(d.equipo) + escalaXBoxplots.bandwidth() / 2 + lineLength / 2)
  .attr("y1", d => escalaYBoxplots(Math.max(d.min, d3.min(d.values))))
  .attr("y2", d => escalaYBoxplots(Math.max(d.min, d3.min(d.values))))
  .attr("stroke", "black")
  .attr("stroke-width", 1);


// Add the X-axis to the boxplots
svg3.append("g")
  .attr("transform", `translate(${margen.izquierdo},${altoGrafico + margen.superior})`)
  .call(d3.axisBottom(escalaXBoxplots));

// Add the Y-axis to the boxplots
svg3.append("g")
  .attr("transform", `translate(${margen.izquierdo},${margen.superior})`)
  .call(d3.axisLeft(escalaYBoxplots));

// Add a title to the boxplots
svg3.append("text")
  .attr("x", (anchoGrafico + margen.izquierdo + margen.derecho) / 2)
  .attr("y", margen.superior / 2)
  .attr("text-anchor", "middle")
  .attr("font-size", "16px")
  .text("Boxplots of Team Scores");