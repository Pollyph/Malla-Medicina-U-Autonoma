// LISTA DE RAMOS + PRERREQUISITOS
const ramos = [
  { nombre: "Bases científicas de la medicina I", req: [] },
  { nombre: "Biomatemáticas", req: [] },
  { nombre: "Antropología", req: [] },
  { nombre: "Introducción a la medicina", req: [] },
  { nombre: "Inglés técnico I", req: [] },
  { nombre: "Aprendizaje activo", req: [] },

  { nombre: "Bases científicas II", req: ["Bases científicas de la medicina I"] },
  { nombre: "Integrado de morfología I", req: ["Bases científicas de la medicina I"] },
  { nombre: "Psicología de la salud", req: ["Antropología"] },
  { nombre: "Recursos básicos", req: [] },
  { nombre: "Inglés técnico II", req: ["Inglés técnico I"] },
  { nombre: "Comunicación en contexto", req: [] },

  { nombre: "Bases científicas III", req: ["Bases científicas II", "Integrado de morfología I"] },
  { nombre: "Integrado de morfología II", req: ["Integrado de morfología I"] },
  { nombre: "Microbiología", req: ["Bases científicas II", "Integrado de morfología I"] },
  { nombre: "Salud pública y epidemiología", req: ["Biomatemáticas"] },
  { nombre: "Electivo de comunicación", req: [] },

  { nombre: "Bases científicas IV", req: ["Bases científicas III", "Integrado de morfología II"] },
  { nombre: "Neurociencias", req: ["Bases científicas III", "Integrado de morfología II"] },
  { nombre: "Patología", req: ["Bases científicas III", "Integrado de morfología II"] },
  { nombre: "Microbiología aplicada", req: ["Microbiología"] },
  { nombre: "Salud comunitaria I", req: ["Psicología de la salud", "Salud pública y epidemiología"] },
  { nombre: "Fundamentos diagnóstico", req: ["Integrado de morfología II", "Recursos básicos", "Bases científicas III"] },

  // Continúan de la misma forma...
];

// ORGANIZAR TODO EN 14 COLUMNAS (UNA POR SEMESTRE)
const columnas = [];
for (let i = 0; i < 14; i++) columnas.push([]);

let index = 0;
for (let c = 0; c < columnas.length; c++) {
  for (let x = 0; x < Math.ceil(ramos.length / 14); x++) {
    if (index < ramos.length) columnas[c].push(ramos[index]);
    index++;
  }
}

const contenedor = document.getElementById("malla");

// Crear columnas visibles
columnas.forEach(col => {
  const columnaDiv = document.createElement("div");
  columnaDiv.classList.add("columna");

  col.forEach(ramo => {
    const div = document.createElement("div");
    div.classList.add("ramo");

    div.dataset.nombre = ramo.nombre;
    div.textContent = ramo.nombre;

    columnaDiv.appendChild(div);
  });

  contenedor.appendChild(columnaDiv);
});

// DESBLOQUEAR AUTOMÁTICAMENTE
function actualizarDesbloqueos() {
  document.querySelectorAll(".ramo").forEach(div => {
    const nombre = div.dataset.nombre;
    const info = ramos.find(r => r.nombre === nombre);

    const cumplido = info.req.every(r => {
      const reqDiv = document.querySelector(`[data-nombre="${r}"]`);
      return reqDiv && reqDiv.classList.contains("aprobado");
    });

    if (cumplido) div.classList.remove("bloqueado");
    else div.classList.add("bloqueado");
  });
}

actualizarDesbloqueos();

// CLICK PARA APROBAR
document.querySelectorAll(".ramo").forEach(div => {
  div.addEventListener("click", () => {
    if (div.classList.contains("bloqueado")) return;

    div.classList.toggle("aprobado");
    actualizarDesbloqueos();
  });
});
