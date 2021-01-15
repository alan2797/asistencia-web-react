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
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
      },
      formControl: {
        margin: theme.spacing(1),
        width: '80%',
      },
  }));

  export default function Materia() {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [actualizar,setActualizar] = React.useState(false);
    const [idMateriaEliminar,setIdMateriaEliminar] = React.useState(-1)
    const [idDocente, setIdDocente] = React.useState(-1);
    const [listaMateria,setListaMateria] = React.useState([])
    const [listaDocente,setListaDocente] = React.useState([])
    const [openModalEliminar,setOpenModalEliminar] = React.useState(false);
    const [materia, setMateria] = React.useState({
        descripcion : '',
        sigla : '',
        nivel : '',
        iddocente : -1
    })
    const handleOpenModal = () => {
        setOpenModal(true);
      };
      const handleOpenModalEliminar = (idmateria) => {
        setOpenModalEliminar(true);
        setIdMateriaEliminar(idmateria);
      };
      useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        console.log("componentDidmount")
        const datos = {
          opcion : 'listar'
        }
        axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarDocente.php',datos)
        .then(res => {
          const docentes = res.data;
          
          setListaDocente(docentes.data)
          
        })

        console.log("componentDidmount")
        const datos2 = {
          opcion : 'listar'
        }
        axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarMateria.php',datos)
        .then(res => {
          const docentes = res.data;
 
          setListaMateria(docentes.data)
          
        })
      },[actualizar]);
      const handleCloseModal = () => {
        setOpenModal(false);
      };
      
      const handleCloseModalEliminar = () => {
        setOpenModalEliminar(false);
      };
      const handleChangeNombre = name  => event => {
       // setNombreDocente({ ...nombreDocente, [name]: event.target.value });
    }
    const handleChangeMateriaDatos = name => event => {
        setMateria({...materia,[name] : event.target.value });
    }
     const guardarMateria = () => {
      const datos = {
        opcion : 'registrar',
        descripcion : materia.descripcion,
        sigla : materia.sigla,
        nivel : materia.nivel,
        iddocente : materia.iddocente
      }
      if(datos.descripcion == ''){
        alert("campo descripcion requerido")
        return;
      }
      if(datos.sigla == ''){
        alert("campo sigla requerido")
        return;
      }
      if(datos.nivel == ''){
        alert("campo nivel requerido")
        return;
      }
      if(datos.iddocente == -1){
        alert("campo docente requerido")
        return;
      }
      console.log(datos)
      axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarMateria.php',datos)
      .then(res => {
        const data = res.data;
        handleCloseModal();
        setActualizar(!actualizar)
      })
     } 
     const handleChangeDocente = event => {
         console.log(event.target.value)
        setIdDocente(event.target.value);
        console.log(idDocente)
      };
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
                      <h3>Nueva Materia</h3>
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
                      label="Descripcion"
                      className={classes.textField}
                      value={materia.descripcion}
                      onChange={handleChangeMateriaDatos('descripcion')}
                      margin="normal"
                  />
                  <TextField
                      id="standard-name"
                      label="Sigla"
                      className={classes.textField}
                      value={materia.sigla}
                      onChange={handleChangeMateriaDatos('sigla')}
                      margin="normal"
                  />
                </Grid>
                <Grid container 
                      direction="row"
                      justify="space-around"
                      alignItems="center">
                  <TextField
                      id="standard-name"
                      label="Nivel"
                      className={classes.textField}
                      value={materia.nivel}
                      onChange={handleChangeMateriaDatos('nivel')}
                      margin="normal"
                  />
                   <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Docente</InputLabel>
                        <Select
                        value={materia.iddocente}
                        onChange={handleChangeMateriaDatos('iddocente')}
                        >
                        {listaDocente.map((data,index)=>(
                            <MenuItem value={data.id}>{data.nombre + " "+ data.apellido}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
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
                            component="span" className={classes.button} onClick={guardarMateria}>
                     Guardar
                    </Button>
                </label>
                </Grid>
          </div>
        </Fade>
      </Modal>
      )
    }
    const eliminarMateria = () => {
      console.log("ideliminar     ",idMateriaEliminar)
      const datos = {
        opcion : 'eliminar',
        idmateria : idMateriaEliminar
      }
      axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarMateria.php',datos)
      .then(res => {
        const data = res.data;
        handleCloseModalEliminar();
        setActualizar(true)
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
                            component="span" className={classes.button} onClick={eliminarMateria}>
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
                Registrar Nueva Materia
                </Button>
            </label>
        </div> 
      </div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nro</TableCell>
              <TableCell align="right">Descripcion</TableCell>
              <TableCell align="right">Sigla</TableCell>
              <TableCell align="right">Nivel</TableCell>
              <TableCell align="right">Docente</TableCell>
              <TableCell align="right">Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaMateria.map((row,index) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell align="right">{row.descripcion}</TableCell>
                <TableCell align="right">{row.sigla}</TableCell>
                <TableCell align="right">{row.nivel}</TableCell>
                <TableCell align="right">{row.nombre + " " + row.apellido}</TableCell>
                <TableCell align="right">
                    <Icon className={classes.iconHover} color="primary" style={{ fontSize: 30 }} 
                          onClick={() => {handleOpenModalEliminar(row.id)}}>
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
    </div>
     
    );
  }

//export default Alumno;