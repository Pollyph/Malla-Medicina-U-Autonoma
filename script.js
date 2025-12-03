/* script.js - lógica de la malla interactiva
   Copia este archivo y enlázalo desde index.html (ya está puesto en el ejemplo).
*/
(() => {
  // Definición de ramos con prerrequisitos (usa nombres tal como fueron entregados)
  const coursesData = [
    // Semestre 1
    { id: "bases1", name: "Bases científicas de la medicina I", semester: 1, prereqs: [] },
    { id: "biomatematicas", name: "Biomatemáticas", semester: 1, prereqs: [] },
    { id: "antropologia", name: "Antropología", semester: 1, prereqs: [] },
    { id: "intro_medicina", name: "Introducción a la medicina", semester: 1, prereqs: [] },
    { id: "ingles1", name: "Inglés técnico para la medicina I", semester: 1, prereqs: [] },
    { id: "aprendizaje_activo", name: "Aprendizaje activo", semester: 1, prereqs: [] },

    // Semestre 2
    { id: "bases2", name: "Bases científicas de la medicina II", semester: 2, prereqs: ["bases1"] },
    { id: "int_morf1", name: "Integrado de morfología I", semester: 2, prereqs: ["bases1"] },
    { id: "psicologia_salud", name: "Psicología de la salud", semester: 2, prereqs: ["antropologia"] },
    { id: "recursos_basicos", name: "Recursos básicos de atención en salud", semester: 2, prereqs: [] },
    { id: "ingles2", name: "Inglés técnico para la medicina II", semester: 2, prereqs: ["ingles1"] },
    { id: "comunicacion_contexto", name: "Comunicación en contexto", semester: 2, prereqs: [] },

    // Semestre 3
    { id: "bases3", name: "Bases científicas de la medicina III", semester: 3, prereqs: ["bases2", "int_morf1"] },
    { id: "int_morf2", name: "Integrado de morfología II", semester: 3, prereqs: ["int_morf1"] },
    { id: "microbiologia", name: "Microbiología", semester: 3, prereqs: ["bases2", "int_morf1"] },
    { id: "salud_pub", name: "Salud pública y epidemiología", semester: 3, prereqs: ["biomatematicas"] },
    { id: "elect_comunic", name: "Electivo de comunicación", semester: 3, prereqs: [] },
    { id: "bases4", name: "Bases científicas de la medicina IV", semester: 3, prereqs: ["bases3", "int_morf2"] },
    { id: "neurociencias", name: "Neurociencias", semester: 3, prereqs: ["bases3", "int_morf2"] },
    { id: "patologia", name: "Patología y anatomía patológica", semester: 3, prereqs: ["bases3", "int_morf2"] },
    { id: "microb_clinica", name: "Microbiología aplicada a la clínica", semester: 3, prereqs: ["microbiologia"] },
    { id: "salud_com_fam1", name: "Salud comunitaria y familiar I", semester: 3, prereqs: ["psicologia_salud", "salud_pub"] },
    { id: "fund_diag_clinico", name: "Fundamentos del diagnóstico clínico", semester: 3, prereqs: ["int_morf2", "recursos_basicos", "bases3"] },

    // Quinto semestre (notarás que en tu listado se salta el 'cuarto' numeración; respeté tu contenido)
    { id: "fisiopatologia", name: "Fisiopatología", semester: 5, prereqs: ["bases4", "neurociencias"] },
    { id: "farmaco_gen", name: "Farmacología general", semester: 5, prereqs: ["bases4", "microb_clinica"] },
    { id: "metodologia", name: "Metodología de la investigación y bioestadística", semester: 5, prereqs: ["salud_pub"] },
    { id: "salud_com_fam2", name: "Salud comunitaria y familiar II", semester: 5, prereqs: ["salud_com_fam1"] },
    { id: "med_int_5", name: "Medicina interna (5)", semester: 5, prereqs: ["bases4","neurociencias","patologia","microb_clinica","fund_diag_clinico"] },

    // Sexto
    { id: "farmaco_aplic", name: "Farmacología aplicada a la clínica", semester: 6, prereqs: ["farmaco_gen"] },
    { id: "med_evidencia", name: "Medicina basada en la evidencia", semester: 6, prereqs: ["metodologia"] },
    { id: "med_int_6", name: "Medicina interna (6)", semester: 6, prereqs: ["bases4","neurociencias","patologia","microb_clinica","fund_diag_clinico"] },
    { id: "elect_etica", name: "Electivo de ética", semester: 6, prereqs: [] },

    // Septimo
    { id: "salud_com_fam3", name: "Salud comunitaria y familiar III", semester: 7, prereqs: ["salud_com_fam2"] },
    { id: "esp_quirurgicas", name: "Especialidades quirúrgicas", semester: 7, prereqs: ["fisiopatologia","med_int_6","farmaco_aplic"] },
    { id: "geriatria", name: "Geriatría", semester: 7, prereqs: ["fisiopatologia","med_int_6","farmaco_aplic"] },
    { id: "bioetica", name: "Bioética", semester: 7, prereqs: [] },

    // Octavo
    { id: "salud_com_fam4", name: "Salud comunitaria y familiar IV", semester: 8, prereqs: ["salud_com_fam3"] },
    { id: "pediatria", name: "Pediatría y cirugía infantil", semester: 8, prereqs: ["fisiopatologia","med_int_6","farmaco_aplic"] },
    { id: "oncologia", name: "Oncología y cuidados paliativos", semester: 8, prereqs: ["esp_quirurgicas","geriatria"] },
    { id: "razonamiento", name: "Razonamiento e integración clínica", semester: 8, prereqs: ["esp_quirurgicas","geriatria","salud_com_fam3","bioetica"] },

    // Noveno
    { id: "gineco_obst", name: "Ginecología y obstetricia", semester: 9, prereqs: ["esp_quirurgicas","pediatria","oncologia"] },
    { id: "salud_mental", name: "Salud mental, psicopatología y psiquiatría", semester: 9, prereqs: ["razonamiento"] },
    { id: "med_legal", name: "Medicina legal", semester: 9, prereqs: ["bioetica"] },
    { id: "elect_desarrollo", name: "Electivo de desarrollo personal", semester: 9, prereqs: [] },

    // Decimo
    { id: "gestion_admin", name: "Gestión y administración en salud", semester: 10, prereqs: ["salud_com_fam4"] },
    { id: "med_integr_urg", name: "Medicina integrada y de urgencias", semester: 10, prereqs: ["esp_quirurgicas","pediatria","oncologia"] },
    { id: "subesp_med", name: "Subespecialidades médicas", semester: 10, prereqs: ["gineco_obst","salud_mental"] },
    { id: "elect_responsabilidad", name: "Electivo de responsabilidad social", semester: 10, prereqs: [] },

    // Internados (11-14): requieren "todos los ramos anteriores" -> los marcaré como prereq especial 'ALL_PREV'
    { id: "internado_med_int", name: "Internado medicina interna", semester: 11, prereqs: ["ALL_PREV"] },
    { id: "internado_esp_quir", name: "Internado de especialidades quirúrgicas", semester: 11, prereqs: ["ALL_PREV"] },
    { id: "internado_gineco", name: "Internado de ginecología y obstetricia", semester: 11, prereqs: ["ALL_PREV"] },
    { id: "internado_electivo1", name: "Internado electivo I", semester: 11, prereqs: ["ALL_PREV"] },

    { id: "internado_fam_rural", name: "Internado de medicina familiar y rural", semester: 13, prereqs: ["ALL_PREV"] },
    { id: "internado_urgencia", name: "Internado de urgencia", semester: 13, prereqs: ["ALL_PREV"] },
    { id: "internado_ped_cir", name: "Internado de pediatría y cirugía infantil", semester: 13, prereqs: ["ALL_PREV"] },
    { id: "internado_electivo2", name: "Internado electivo II", semester: 13, prereqs: ["ALL_PREV"] },
  ];

  // Estado (aprobados) se guarda en localStorage por id -> true/false
  const STORAGE_KEY = "malla_aprobados_v1";

  // UI mount
  const mount = document.getElementById("malla");
  const resetBtn = document.getElementById("resetBtn");
  const exportBtn = document.getElementById("exportBtn");
  const importBtn = document.getElementById("importBtn");
  const importFile = document.getElementById("importFile");

  // Helper: obtener mapa id -> course
  const courseById = {};
  coursesData.forEach(c => courseById[c.id] = c);

  // Build full prereq mapping: resolve ALL_PREV marker to the set of all non-intern previous course ids
  function resolveAllPrev() {
    // gather ids considered "previous": all courses that do not themselves have ALL_PREV
    const nonAllPrevIds = coursesData.filter(c => !c.prereqs.includes("ALL_PREV")).map(c => c.id);
    coursesData.forEach(c => {
      if (c.prereqs.includes("ALL_PREV")) {
        // set to copy of nonAllPrevIds
        c._resolvedPrereqs = [...nonAllPrevIds];
      } else {
        c._resolvedPrereqs = [...c.prereqs];
      }
    });
  }
  resolveAllPrev();

  // Load saved approved state
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      return JSON.parse(raw);
    } catch (e) {
      console.warn("Error leyendo storage:", e);
      return {};
    }
  }
  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // Determine if course unlocked: all resolved prereqs are approved
  function isUnlocked(id, approvedState) {
    const course = courseById[id];
    const prereqs = course._resolvedPrereqs || [];
    if (prereqs.length === 0) return true;
    return prereqs.every(pid => !!approvedState[pid]);
  }

  // Render UI grouped by semester (ascending)
  function render() {
    const approvedState = loadState();
    mount.innerHTML = ""; // reset

    // Build semesters map
    const semMap = {};
    coursesData.forEach(c => {
      if (!semMap[c.semester]) semMap[c.semester] = [];
      semMap[c.semester].push(c);
    });

    const semKeys = Object.keys(semMap).sort((a,b)=>Number(a)-Number(b));
    semKeys.forEach(sem => {
      const semCard = document.createElement("section");
      semCard.className = "sem-card";
      semCard.setAttribute("aria-label", `Semestre ${sem}`);

      const title = document.createElement("div");
      title.className = "sem-title";
      title.innerHTML = `<h2>Semestre ${sem}</h2><div class="sem-info">${semMap[sem].length} ramos</div>`;
      semCard.appendChild(title);

      const list = document.createElement("div");
      list.className = "courses";
      semMap[sem].forEach(course => {
        const unlocked = isUnlocked(course.id, approvedState);
        const approved = !!approvedState[course.id];

        const tile = document.createElement("button");
        tile.className = "course";
        if (!unlocked) tile.classList.add("locked");
        if (approved) tile.classList.add("approved");
        tile.setAttribute("data-id", course.id);
        tile.setAttribute("aria-pressed", approved ? "true" : "false");
        tile.setAttribute("aria-disabled", unlocked ? "false" : "true");
        tile.title = course.name;

        // left content
        const left = document.createElement("div");
        left.className = "left";
        const dot = document.createElement("span");
        dot.className = "dot";
        const name = document.createElement("div");
        name.className = "name";
        name.textContent = course.name;
        left.appendChild(dot);
        left.appendChild(name);

        // right meta (prereqs count)
        const right = document.createElement("div");
        right.className = "meta";
        const prereqList = (course._resolvedPrereqs || []).map(p => courseById[p]?.name || p);
        const prereqText = prereqList.length ? `Prerreq: ${prereqList.join(", ")}` : "Sin prerrequisitos";
        right.textContent = approved ? "Aprobado" : (unlocked ? "Disponible" : "Bloqueado");

        // tooltip small
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.textContent = prereqText;
        right.appendChild(tooltip);

        tile.appendChild(left);
        tile.appendChild(right);

        // Click handler
        tile.addEventListener("click", (e) => {
          e.preventDefault();
          const id = course.id;
          const current = loadState();
          const unlockedNow = isUnlocked(id, current);
          if (!unlockedNow) {
            // flash or simple shake to indicate locked
            tile.animate([
              { transform: 'translateX(0)' },
              { transform: 'translateX(-6px)' },
              { transform: 'translateX(6px)' },
              { transform: 'translateX(0)' }
            ], { duration: 260, easing: 'ease' });
            return;
          }
          // toggle approved
          current[id] = !current[id];
          saveState(current);
          // Re-render to reflect unlocked dependents
          render();
        });

        list.appendChild(tile);
      });

      semCard.appendChild(list);
      mount.appendChild(semCard);
    });
  }

  // Controls
  resetBtn.addEventListener("click", () => {
    if (!confirm("¿Deseas resetear todos los ramos aprobados?")) return;
    localStorage.removeItem(STORAGE_KEY);
    render();
  });

  exportBtn.addEventListener("click", () => {
    const state = loadState();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "malla_aprobados.json";
    a.click();
    URL.revokeObjectURL(url);
  });

  importBtn.addEventListener("click", () => importFile.click());
  importFile.addEventListener("change", (ev) => {
    const file = ev.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const obj = JSON.parse(e.target.result);
        // Basic validation: must be object with keys that match course ids
        const allowedKeys = new Set(coursesData.map(c => c.id));
        const keys = Object.keys(obj);
        const invalid = keys.filter(k => !allowedKeys.has(k));
        if (invalid.length) {
          if (!confirm("El archivo contiene claves desconocidas. ¿Deseas guardarlo de todas formas?")) return;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
        alert("Importado con éxito.");
        render();
      } catch (err) {
        alert("Error al leer el archivo JSON: " + err.message);
      }
    };
    reader.readAsText(file);
    ev.target.value = ""; // clear
  });

  // Inicializar
  document.addEventListener("DOMContentLoaded", () => {
    // first render
    render();
  });

})();
