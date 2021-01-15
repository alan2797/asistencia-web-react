module.exports = [
  {
    key: 'modulo1g',
    name: 'ADMINISTRACION',
    icon: 'ios-paper-outline',
    child: [
      {
        key: 'alumno',
        name: 'Gestionar Alumno',
        link: '/app/Alumno',
        icon: 'ios-list-box-outline',
      },
      {
        key: 'docente',
        name: 'Gestionar Docente',
        link: '/app/Docente',
        icon: 'ios-grid-outline',
      },
      {
        key: 'materia',
        name: 'Gestionar Materia',
        link: '/app/Materia',
        icon: 'ios-home-outline',
      },
      {
        key: 'horario',
        name: 'Gestionar Horario',
        link: '/app/Horario',
        icon: 'ios-document-outline',
      },
      {
        key: 'inscripcion',
        name: 'Registrar Inscripción',
        link: '/app/Inscripcion',
        icon: 'ios-build-outline'
      },
    ]
  },
];