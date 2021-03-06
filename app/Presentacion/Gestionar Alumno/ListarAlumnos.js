import React, {Component, Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
// validation functions

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
    iconHover: {
      '&:hover': {
        color: red[800],
      },
    },
    button: {
        margin: theme.spacing(1),
        '&:hover' : {
            color : 'white',
            opacity : 0.9
        }
    },
    botonRigth : {
        flex : 1,
        float : 'right'
    },
    rootmodal: {
        transform: 'translateZ(0)',
        height: 300,
        flexGrow: 1,
      },
      modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
 
      },
      paper: {
        width: 550,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius : 10
      },
      textField : {
          paddingRight : 20,
          width : 400
      }
  }));

  export default function Alumno() {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [actualizar,setActualizar] = React.useState(false);
    const [idAlumnoEliminar,setIdAlumnoEliminar] = React.useState(-1)
    const [idAlumnoEditar,setIdAlumnoEditar] = React.useState(-1)
    const [nombreAlumno, setNombreAlumno] = React.useState({
        name: '',
        apellido: '',
        telefono: '',
        ci: '',
      });
      const [nombreAlumnoEditar, setNombreAlumnoEditar] = React.useState({
        id : '',
        name: '',
        apellido: '',
        telefono: '',
        ci: '',
      });
    const [listaAlumno,setListaAlumno] = React.useState([])
    const [openModalEliminar,setOpenModalEliminar] = React.useState(false);
    const [openModalEditar,setOpenModalEditar] = React.useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
      };
      const handleOpenModalEliminar = (idalumno) => {
        setOpenModalEliminar(true);
        setIdAlumnoEliminar(idalumno);
      };
      const handleOpenModalEditar = (index) => {
        setOpenModalEditar(true)
        //setIdAlumnoEditar(idalumno)
        var datos = {
          id : listaAlumno[index].id,
          name : listaAlumno[index].nombre,
          apellido : listaAlumno[index].apellido,
          telefono : listaAlumno[index].telefono,
          ci : listaAlumno[index].ci
        }
        setNombreAlumnoEditar(datos)
        console.log(datos)
      }
      useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        console.log("componentDidmount")
        const datos = {
          opcion : 'listar'
        }
        axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarAlumnoContexto.php',datos)
        .then(res => {
          const alumnos = res.data;
          console.log(alumnos)
          console.log('proxy')
          setListaAlumno(alumnos.data)
          
        })
      },[actualizar]);
      const handleCloseModal = () => {
        setOpenModal(false);
      };
      
      const handleCloseModalEliminar = () => {
        setOpenModalEliminar(false);
      };
      const handleCloseModalEditar = () => {
        setOpenModalEditar(false);
      };
      const handleChangeNombre = name  => event => {
        setNombreAlumno({ ...nombreAlumno, [name]: event.target.value });
    }
    
    const handleChangeNombreEditar = name  => event => {
      setNombreAlumnoEditar({ ...nombreAlumnoEditar, [name]: event.target.value });
    }
     const guardarAlumno = () => {
      const datos = {
        opcion : 'registrar',
        nombre : nombreAlumno.name,
        apellido : nombreAlumno.apellido,
        ci : nombreAlumno.ci,
        telefono : nombreAlumno.telefono
      }
      if(datos.nombre == ''){
        alert("campo nombre requerido")
        return;
      }
      if(datos.apellido == ''){
        alert("campo apellido requerido")
        return;
      }
      if(datos.ci == ''){
        alert("campo ci requerido")
        return;
      }
      if(datos.telefono == ''){
        alert("campo telefono requerido")
        return;
      }
      axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarAlumnoContexto.php',datos)
      .then(res => {
        const data = res.data;
        handleCloseModal();
        setActualizar(!actualizar)
      })
     } 
    const modalRegistrar = () => {
      return(
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
              <div>
                  <div>
                      <h3>Nuevo Alumno</h3>
                  </div>
              </div>
              <Divider/>
              <div>
                <Grid container 
                      direction="row"
                      justify="space-around"
                      alignItems="center">
                  
                  <TextField
                      id="standard-name"
                      label="Nombre"
                      className={classes.textField}
                      value={nombreAlumno.name}
                      onChange={handleChangeNombre('name')}
                      margin="normal"
                  />
                  <TextField
                      id="standard-name"
                      label="Apellido"
                      className={classes.textField}
                      value={nombreAlumno.apellido}
                      onChange={handleChangeNombre('apellido')}
                      margin="normal"
                  />
                </Grid>
                <Grid container 
                      direction="row"
                      justify="space-around"
                      alignItems="center">
                  <TextField
                      id="standard-name"
                      label="Telefono"
                      className={classes.textField}
                      value={nombreAlumno.telefono}
                      onChange={handleChangeNombre('telefono')}
                      margin="normal"
                  />
                  <TextField
                      id="standard-name"
                      label="Ci"
                      className={classes.textField}
                      value={nombreAlumno.ci}
                      onChange={handleChangeNombre('ci')}
                      margin="normal"
                  />
                </Grid>
              </div>
              <Divider/>
                <Grid container
                      justify = 'flex-end'
                      direction = 'row'>
                    <Button variant="contained" color="danger"
                           className={classes.button} onClick={handleCloseModal}>
                     Cancelar
                    </Button>
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color='primary'
                            component="span" className={classes.button} onClick={guardarAlumno}>
                     Guardar
                    </Button>
                </label>
                </Grid>
          </div>
        </Fade>
      </Modal>
      )
    }
    const modalEditar = () => {
      return(
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalEditar}
        onClose={handleCloseModalEditar}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalEditar}>
          <div className={classes.paper}>
              <div>
                  <div>
                      <h3>Actualizar Alumno</h3>
                  </div>
              </div>
              <Divider/>
              <div>
                <Grid container 
                      direction="row"
                      justify="space-around"
                      alignItems="center">
                  
                  <TextField
                      id="standard-name"
                      label="Nombre"
                      className={classes.textField}
                      value={nombreAlumnoEditar.name}
                      onChange={handleChangeNombreEditar('name')}
                      margin="normal"
                  />
                  <TextField
                      id="standard-name"
                      label="Apellido"
                      className={classes.textField}
                      value={nombreAlumnoEditar.apellido}
                      onChange={handleChangeNombreEditar('apellido')}
                      margin="normal"
                  />
                </Grid>
                <Grid container 
                      direction="row"
                      justify="space-around"
                      alignItems="center">
                  <TextField
                      id="standard-name"
                      label="Telefono"
                      className={classes.textField}
                      value={nombreAlumnoEditar.telefono}
                      onChange={handleChangeNombreEditar('telefono')}
                      margin="normal"
                  />
                  <TextField
                      id="standard-name"
                      label="Ci"
                      className={classes.textField}
                      value={nombreAlumnoEditar.ci}
                      onChange={handleChangeNombreEditar('ci')}
                      margin="normal"
                  />
                </Grid>
              </div>
              <Divider/>
                <Grid container
                      justify = 'flex-end'
                      direction = 'row'>
                    <Button variant="contained" color="danger"
                           className={classes.button} onClick={handleCloseModalEditar}>
                     Cancelar
                    </Button>
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color='primary'
                            component="span" className={classes.button} onClick={guardarAlumno}>
                     Guardar
                    </Button>
                </label>
                </Grid>
          </div>
        </Fade>
      </Modal>
      )
    }
    const eliminarAlumno = () => {
      console.log("ideliminar     ",idAlumnoEliminar)
      const datos = {
        opcion : 'eliminar',
        idalumno : idAlumnoEliminar
      }
      axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarAlumnoContexto.php',datos)
      .then(res => {
        const data = res.data;
        handleCloseModalEliminar();
        setActualizar(!actualizar)
      })
    }
    const modalEliminar = () => {
      return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalEliminar}
        onClose={handleCloseModalEliminar}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalEliminar}>
          <div className={classes.paper}>
              <div>
              </div>
              <Divider/>
              <div>
                <h4>¿Esta Seguro De Eliminar?</h4>
              </div>
              <Divider/>
                <Grid container
                      justify = 'flex-end'
                      direction = 'row'>
                    <Button variant="contained" color="danger"
                           className={classes.button} onClick={handleCloseModalEliminar}>
                     Cancelar
                    </Button>
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color='primary'
                            component="span" className={classes.button} onClick={eliminarAlumno}>
                     Aceptar
                    </Button>
                </label>
                </Grid>
          </div>
        </Fade>
      </Modal>
      )
    }
    return (
    
    <div>
      <div>
        <div className={classes.botonRigth}>
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" className={classes.button} onClick={handleOpenModal}>
                Registrar Nuevo Alumno
                </Button>
            </label>
        </div> 
      </div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nro</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Apellido</TableCell>
              <TableCell align="right">Ci</TableCell>
              <TableCell align="right">Telefono</TableCell>
              <TableCell align="right">Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaAlumno.map((row,index) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell align="right">{row.nombre}</TableCell>
                <TableCell align="right">{row.apellido}</TableCell>
                <TableCell align="right">{row.ci}</TableCell>
                <TableCell align="right">{row.telefono}</TableCell>
                <TableCell align="right">
                    <Icon className={classes.iconHover} color="primary" style={{ fontSize: 30 }} 
                          onClick={() => {handleOpenModalEditar(index)}}>
                        edit
                    </Icon>
                    <Icon className={classes.iconHover} color="error" style={{ fontSize: 30 }}
                          onClick={() => {handleOpenModalEliminar(row.id)}}>
                        delete
                    </Icon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {modalRegistrar()}
      {modalEliminar()}
      {modalEditar()}
    </div>
     
    );
  }

//export default Alumno;