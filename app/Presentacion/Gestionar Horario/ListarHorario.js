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

  export default function Horario() {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [actualizar,setActualizar] = React.useState(false);
    const [idHorarioEliminar,setIdHorarioEliminar] = React.useState(-1)
    const [idMateria, setIdMateria] = React.useState(-1);
    const [listaMateria,setListaMateria] = React.useState([])
    const [listaHorario,setListaHorario] = React.useState([])
    const [openModalEliminar,setOpenModalEliminar] = React.useState(false);
    const [horario, setHorario] = React.useState({
        dia : '',
        hora_ini : '',
        hora_fin : '',
        aula : '',
        idmateria : -1
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
        const datos2 = {
          opcion : 'listar'
        }
        axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarMateria.php',datos2)
        .then(res => {
          const materias = res.data;
          console.log(materias)
          setListaMateria(materias.data)          
        })
        console.log("saliendo")
        console.log("componentDidmount")
        const datos = {
          opcion : 'listar'
        }
        axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarHorario.php',datos)
        .then(res => {
          const horarios = res.data;
          setListaHorario(horarios.data)
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
    const handleChangeHorarioDatos = name => event => {
        setHorario({...horario,[name] : event.target.value });
    }
     const guardarHorario = () => {
      const datos = {
        opcion : 'registrar',
        dia : horario.dia,
        hora_ini : horario.hora_ini,
        hora_fin : horario.hora_fin,
        aula : horario.aula,
        idmateria : horario.idmateria
      }
      if(datos.dia == ''){
        alert("campo descripcion requerido")
        return;
      }
      if(datos.hora_ini== ''){
        alert("campo sigla requerido")
        return;
      }
      if(datos.hora_fin == ''){
        alert("campo nivel requerido")
        return;
      }
      if(datos.idmateria == -1){
        alert("campo docente requerido")
        return;
      }
      console.log(datos)
      axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarHorario.php',datos)
      .then(res => {
        const data = res.data;
        handleCloseModal();
        setActualizar(!actualizar)
      })
     } 
     const handleChangeMateria = event => {
         console.log(event.target.value)
        setIdMateria(event.target.value);
        console.log(idMateria)
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
                      <h3>Nuevo Horario</h3>
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
                      label="Dia"
                      className={classes.textField}
                      value={horario.dia}
                      onChange={handleChangeHorarioDatos('dia')}
                      margin="normal"
                  />
                  <TextField
                      id="standard-name"
                      label="Hora inicio"
                      className={classes.textField}
                      value={horario.hora_ini}
                      onChange={handleChangeHorarioDatos('hora_ini')}
                      margin="normal"
                  />
                </Grid>
                <Grid container 
                      direction="row"
                      justify="space-around"
                      alignItems="center">
                  <TextField
                      id="standard-name"
                      label="Hora fin"
                      className={classes.textField}
                      value={horario.hora_fin}
                      onChange={handleChangeHorarioDatos('hora_fin')}
                      margin="normal"
                  />
                  <TextField
                      id="standard-name"
                      label="Aula"
                      className={classes.textField}
                      value={horario.aula}
                      onChange={handleChangeHorarioDatos('aula')}
                      margin="normal"
                  />
                   <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Materias</InputLabel>
                        <Select
                        value={horario.idmateria}
                        onChange={handleChangeHorarioDatos('idmateria')}
                        >
                        {listaMateria.map((data,index)=>(
                            <MenuItem value={data.id}>{data.descripcion + " - "+ data.sigla}</MenuItem>
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
                            component="span" className={classes.button} onClick={guardarHorario}>
                     Guardar
                    </Button>
                </label>
                </Grid>
          </div>
        </Fade>
      </Modal>
      )
    }
    const eliminarHorario = () => {
      console.log("ideliminar     ",idHorarioEliminar)
      const datos = {
        opcion : 'eliminar',
        idhorario : idHorarioEliminar
      }
      axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarHorario.php',datos)
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
                            component="span" className={classes.button} onClick={eliminarHorario}>
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
                Registrar Nuevo Horario
                </Button>
            </label>
        </div> 
      </div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nro</TableCell>
              <TableCell align="right">Dia</TableCell>
              <TableCell align="right">Hora inicio</TableCell>
              <TableCell align="right">Hora Fin</TableCell>
              <TableCell align="right">Aula</TableCell>
              <TableCell align="right">Materia - Sigla</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaHorario.map((row,index) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell align="right">{row.dia}</TableCell>
                <TableCell align="right">{row.hora_ini}</TableCell>
                <TableCell align="right">{row.hora_fin}</TableCell>
                <TableCell align="right">{row.aula}</TableCell>
                <TableCell align="right">{row.descripcion + " " + row.sigla}</TableCell>
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