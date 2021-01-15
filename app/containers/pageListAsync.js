import Loadable from 'react-loadable';
import Loading from 'dan-components/Loading';

export const BlankPage = Loadable({
  loader: () => import('./Pages/BlankPage'),
  loading: Loading,
});
export const DashboardPage = Loadable({
  loader: () => import('./Pages/Dashboard'),
  loading: Loading,
});
export const Form = Loadable({
  loader: () => import('./Pages/Forms/ReduxForm'),
  loading: Loading,
});

export const Alumno = Loadable({
  loader: () => import('../Presentacion/Gestionar Alumno/ListarAlumnos'),
  loading: Loading,
});
export const Docente = Loadable({
  loader: () => import ('../Presentacion/Gestionar Docente/ListarDocentes'),
  loading:Loading
})
export const Materia = Loadable({
  loader: () => import ('../Presentacion/Gestionar Materia/ListarMateria'),
  loading:Loading
})
export const Horario = Loadable({
  loader: () => import ('../Presentacion/Gestionar Horario/ListarHorario'),
  loading:Loading
})
export const Inscripcion = Loadable({
  loader: () => import ('../Presentacion/Registrar Inscripcion/ListarInscripcion'),
  loading:Loading
})
/*export const Table = Loadable({
  loader: () => import('./Pages/Table/BasicTable'),
  loading: Loading,
});
export const Login = Loadable({
  loader: () => import('./Pages/Users/Login'),
  loading: Loading,
});
export const LoginDedicated = Loadable({
  loader: () => import('./Pages/Standalone/LoginDedicated'),
  loading: Loading,
});
export const Register = Loadable({
  loader: () => import('./Pages/Users/Register'),
  loading: Loading,
});
export const ResetPassword = Loadable({
  loader: () => import('./Pages/Users/ResetPassword'),
  loading: Loading,
});
export const NotFound = Loadable({
  loader: () => import('./NotFound/NotFound'),
  loading: Loading,
});
export const NotFoundDedicated = Loadable({
  loader: () => import('./Pages/Standalone/NotFoundDedicated'),
  loading: Loading,
});
export const Error = Loadable({
  loader: () => import('./Pages/Error'),
  loading: Loading,
});
export const Maintenance = Loadable({
  loader: () => import('./Pages/Maintenance'),
  loading: Loading,
});
export const ComingSoon = Loadable({
  loader: () => import('./Pages/ComingSoon'),
  loading: Loading,
});
export const Parent = Loadable({
  loader: () => import('./Parent'),
  loading: Loading,
});*/
