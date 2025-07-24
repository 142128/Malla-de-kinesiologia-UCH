const cursos = [
  { nombre: 'Bases integradas de química, bioquímica, biología celular y genética', id: 'bioquimica' },
  { nombre: 'Anatomía estructural y funcional I', id: 'anatomia1' },
  { nombre: 'Introducción al movimiento humano', id: 'movimiento1' },
  { nombre: 'Física para el estudio de la kinesiología', id: 'fisica' },
  { nombre: 'Estrategias de búsqueda bibliográfica', id: 'busqueda' },
  { nombre: 'Principios de evolución', id: 'evolucion' },
  { nombre: 'Inglés I', id: 'ingles1' },
  { nombre: 'Formación general I', id: 'fg1' },

  { nombre: 'Anatomía estructural y funcional II', id: 'anatomia2', requiere: ['anatomia1'] },
  { nombre: 'Estructura y función tisular', id: 'tisular' },
  { nombre: 'Biomecánica, lesión y reparación tisular', id: 'biomecanica', requiere: ['fisica', 'bioquimica'] },
  { nombre: 'Introducción a la kinesiología', id: 'introkin' },
  { nombre: 'Lectura comprensiva de artículos científicos', id: 'lectura1', requiere: ['busqueda'] },
  { nombre: 'Inglés II', id: 'ingles2', requiere: ['ingles1'] },
  { nombre: 'Formación general II', id: 'fg2' },

  { nombre: 'Fisiología de sistemas', id: 'fisiologia', requiere: ['bioquimica'] },
  { nombre: 'Bases integradas de infectología, inmunología y farmacología general', id: 'infecto', requiere: ['fisiologia'] },
  { nombre: 'Examen kinésico básico', id: 'examen', requiere: ['anatomia2', 'movimiento1'] },
  { nombre: 'Control y aprendizaje motor', id: 'control', requiere: ['anatomia2'] },
  { nombre: 'Fundamentos de la investigación científica', id: 'invest1', requiere: ['lectura1'] },
  { nombre: 'Educación física I', id: 'ef1' },
  { nombre: 'Inglés III', id: 'ingles3', requiere: ['ingles2'] },

  { nombre: 'Fisiopatología y farmacología de sistemas', id: 'fisiopato', requiere: ['fisiologia'] },
  { nombre: 'Procedimientos terapéuticos básicos y generales', id: 'procedimientos', requiere: ['examen'] },
  { nombre: 'Examen de la condición física y conducta motora', id: 'condicion', requiere: ['control', 'movimiento1'] },
  { nombre: 'Kinesiología del desarrollo psicomotor', id: 'psicomotor', requiere: ['control', 'movimiento1'] },
  { nombre: 'Análisis bioinstrumental del movimiento humano', id: 'bioinstrumental', requiere: ['biomecanica'] },
  { nombre: 'Lectura crítica de artículos científicos', id: 'lectura2', requiere: ['invest1'] },
  { nombre: 'Inglés IV', id: 'ingles4', requiere: ['ingles3'] },
  { nombre: 'Formación general III', id: 'fg3' },
];

const malla = document.getElementById('malla');
const estados = {};

cursos.forEach(curso => {
  const div = document.createElement('div');
  div.className = 'course';
  div.id = curso.id;
  div.textContent = curso.nombre;

  if (!curso.requiere) div.classList.add('unlocked');

  div.addEventListener('click', () => aprobar(curso));
  malla.appendChild(div);
});

function aprobar(curso) {
  const div = document.getElementById(curso.id);
  if (!div.classList.contains('unlocked') || div.classList.contains('approved')) return;

  div.classList.add('approved');
  estados[curso.id] = true;

  cursos.forEach(c => {
    if (c.requiere && !document.getElementById(c.id).classList.contains('approved')) {
      const allOk = c.requiere.every(r => estados[r]);
      if (allOk) {
        document.getElementById(c.id).classList.add('unlocked');
      }
    }
  });
}

