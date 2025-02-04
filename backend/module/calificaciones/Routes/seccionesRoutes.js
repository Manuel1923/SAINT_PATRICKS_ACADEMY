import express from 'express';
import {
    get_seccionesP,
    createSeccion,
    updateSeccion,
    deleteSeccion,
    obtenerSeccionesPorProfesor,
    obtenerTodasLasSeccionesYProfesoresAdmin 
} from '../Controller/seccionesController.js'; // Importa el controlador

const router = express.Router();

// Ruta para obtener todas las secciones
router.get('/versecciones', get_seccionesP);

// Ruta para crear una nueva sección
router.post('/crearsecciones', createSeccion);

// Ruta para actualizar una sección existente
router.put('/actuasecciones', updateSeccion);

// Ruta para eliminar una sección
router.delete('/eliminarsecciones/:id', deleteSeccion);


// Ruta para obtener las secciones de un profesor usando el token
router.get('/porprofesor', obtenerSeccionesPorProfesor);

// Define la ruta para obtener las secciones por profesor
router.get('/porprofesor/:codProfesor', obtenerTodasLasSeccionesYProfesoresAdmin);

export default router;
