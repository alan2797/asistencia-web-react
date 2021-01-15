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
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { green } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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
          width : '40%'
      },
      formControl: {
        margin: theme.spacing(1),
        width: '40%',
      },
  }));

  export default function Inscripcion() {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [actualizar,setActualizar] = React.useState(false);
    const [actualizarModal,setActualizarModal] = React.useState(false);
    const [idInscripcionEliminar,setIdInscripcionEliminar] = React.useState(-1)
    const [idAlumno, setIdAlumno] = React.useState(-1);
    const [cantidad,setCantidad] = React.useState(0);
    const [listaMateria,setListaMateria] = React.useState([])
    const [listaAlumno,setListaAlumno] = React.useState([])
    const [listarDetalle,setListaDetalle] = React.useState([])
    const [listaInscripcion,setListaInscripcion] = React.useState([])
    const [fechaActual,setFechaActual] = React.useState(
      ''
    )
    const [arrayCheckedMateria,setArrayCheckedMateria] = React.useState([])
    const [openModalEliminar,setOpenModalEliminar] = React.useState(false);
    const [openModalShow,setOpenModalShow] = React.useState(false);
    const [inscripcion, setInscripcion] = React.useState({
        fecha : '',
        cantidad : 0,
        idalumno : -1,
    })
    const handleOpenModal = () => {
        setOpenModal(true);
      };
      const handleOpenModalEliminar = (idinscripcion) => {
        setOpenModalEliminar(true);
        setIdInscripcionEliminar(idinscripcion);
      };
      
      const handleOpenModalShow = (idinscripcion) => {
        getDetalleInscripcion(idinscripcion)
        setOpenModalShow(true);
        //setIdInscripcionEliminar(idinscripcion);
      };
      const getDetalleInscripcion = (idinscripcion) => {
        console.log("llego a detalle")
        const datos = {
          opcion : 'listarDetalle',
          idinscripcion : idinscripcion
        }
        axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarInscripcion.php',datos)
        .then(res => {
          const detalle = res.data;
          console.log(detalle)
          setListaDetalle(detalle.data)
        })
      }
      const convertirFecha = () => {
        var date = new Date();
        var dia = date.getDate();
        var mes = date.getMonth();
        var año = date.getFullYear();
        return dia + "/"+mes +"/"+año;
      }
      useEffect(() => {
        var fecha = convertirFecha();
        setFechaActual(fecha);
        // Actualiza el título del documento usando la API del navegador
        console.log("componentDidmount")
        const datos = {
          opcion : 'listar'
        }
        axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarAlumno.php',datos)
        .then(res => {
          const alumnos = res.data;
          setListaAlumno(alumnos.data)
        })

        console.log("componentDidmount")
        const datos2 = {
          opcion : 'listar'
        }
        axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarMateria.php',datos2)
        .then(res => {
          const materias = res.data;
 
          setListaMateria(materias.data)
          
        })
        console.log("componentDidmount")
        const datos3 = {
          opcion : 'listar'
        }
        axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarInscripcion.php',datos3)
        .then(res => {
          const inscripcion = res.data;
 
          setListaInscripcion(inscripcion.data)
          
        })
      },[actualizar]);
      const handleCloseModal = () => {
        setOpenModal(false);
      };
      
      const handleCloseModalEliminar = () => {
        setOpenModalEliminar(false);
      };
      const handleCloseModalShow = () => {
        setOpenModalShow(false);
      }
      const handleChangeNombre = name  => event => {
       // setNombreDocente({ ...nombreDocente, [name]: event.target.value });
    }
    const handleChangeMateriaDatos = name => event => {
        setInscripcion({...inscripcion,[name] : event.target.value });
    }
     const guardarInscripcion = () => {
      const datos = {
        opcion : 'registrar',
        fecha : fechaActual,
        cantidad : cantidad,
        idalumno : inscripcion.idalumno,
        arrayDetalle : arrayCheckedMateria
      }
      console.log(datos)
      if(datos.arrayDetalle.length < 1){
        alert("debe seleccionar por lo menos 1 materia")
        return;
      }
      if(datos.idalumno == ''){
        alert("debe seleccionar un alumno")
        return;
      }
      axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarInscripcion.php',datos)
      .then(res => {
        const data = res.data;
        console.log(data)
        handleCloseModal();
        setActualizar(!actualizar)
      })
     } 
     const handleChangeAlumno = event => {
         console.log(event.target.value)
        setIdAlumno(event.target.value);
        console.log(idDocente)
      };
      const handleChangeCheck = idmateria => event => {
        if(arrayCheckedMateria.includes(idmateria)){
          var posicion = arrayCheckedMateria.indexOf(idmateria);
          arrayCheckedMateria.splice(posicion,1)
          console.log(arrayCheckedMateria)
          setArrayCheckedMateria(arrayCheckedMateria);
          setActualizarModal(!actualizarModal)
          setCantidad(cantidad - 1)
         
        }else{
          arrayCheckedMateria.push(idmateria)
          console.log(arrayCheckedMateria)
          setArrayCheckedMateria(arrayCheckedMateria);
          setActualizarModal(!actualizarModal)
          setCantidad(cantidad + 1)
        }
        //modalRegistrar();
      };
      const checkedMateria = idmateria => {
        console.log(idmateria)
        if(arrayCheckedMateria.includes(idmateria)){
          console.log("true")
          return true;
        }else{
          console.log("false")
          return false
        }
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
                      label="Fecha"
                      className={classes.textField}
                      value={fechaActual}
                      margin="normal"
                  />
                  <TextField
                      id="standard-name"
                      label="Cantidad"
                      className={classes.textField}
                      value={cantidad}
                      margin="normal"
                  />
                  <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Alumno</InputLabel>
                        <Select
                        value={inscripcion.idalumno}
                        onChange={handleChangeMateriaDatos('idalumno')}
                        >
                        {listaAlumno.map((data,index)=>(
                            <MenuItem value={data.id}>{data.nombre + " "+ data.apellido}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Divider/>
                <div>
                      <center><h3>Materias a inscribir</h3></center>
                  </div>
              <Divider/>
                <Grid container 
                      direction="row"
                      justify="center"
                      alignItems="center">
                  {listaMateria.map((datos,index) => (
                    <div style={{width:'90%'}} >
                      <FormControlLabel
                      
                    control={
                      <Checkbox 
                        checked={arrayCheckedMateria.includes(datos.id)}
                        value = {datos.id}
                        onChange={handleChangeCheck(datos.id)}
                      />
                    }
                    label={datos.descripcion}
                  />
                    </div>
                    
                  ))}     
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
                            component="span" className={classes.button} onClick={guardarInscripcion}>
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
      console.log("ideliminar     ",idInscripcionEliminar)
      const datos = {
        opcion : 'eliminar',
        idinscripcion : idInscripcionEliminar
      }
      axios.post('http://localhost:8082/ParcialAsistencia/WServices/GestionarInscripcion.php',datos)
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
    const modalShow = () => {
      return(
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalShow}
        onClose={handleCloseModalShow}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalShow}>
          <div className={classes.paper}>
              <div>
              </div>
              <Divider/>
              <div>
                <h4>Detalle De La Inscripcion</h4>
              </div>
              <Divider/>
                <Grid container
                      justify='center'>
                        {listarDetalle.map((data,index) => (
                          <Card style={{width:'85%',margin : 10}}>
                          <CardContent>
                            <Typography style={{fontWeight:'bold'}} color="textSecondary">
                              {data.descripcion + "  ----  "+ data.sigla}
                            </Typography>
                          </CardContent>
                          </Card>
                        ))}
                </Grid>
                <Grid container
                      justify = 'flex-end'
                      direction = 'row'>
                    <Button variant="contained" color="danger"
                           className={classes.button} onClick={handleCloseModalShow}>
                     ok
                    </Button>
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
                Registrar Nueva Inscripcion
                </Button>
            </label>
        </div> 
      </div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nro</TableCell>
              <TableCell align="right">Fecha</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Alumno</TableCell>
              <TableCell align="right">Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaInscripcion.map((row,index) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell align="right">{row.fecha}</TableCell>
                <TableCell align="right">{row.cantidad}</TableCell>
                <TableCell align="right">{row.nombre + " " + row.apellido}</TableCell>
                <TableCell align="right">
                    <Icon className={classes.iconHover} color="primary" style={{ fontSize: 30 }} 
                          onClick={() => {handleOpenModalShow(row.id)}}>
                        visibility
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
      {modalShow()}
    </div>
     
    );
  }

//export default Alumno;