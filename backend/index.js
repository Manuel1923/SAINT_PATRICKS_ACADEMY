import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importar cors
import conectarDB from './config/db.js'; 
import usuariosRoutes from './module/auth/usuario_routes.js'; 
import profesoresRoutes from './module/calificaciones/Routes/profesoresRoutes.js';
import tiposContratoRoutes from './module/calificaciones/Routes/tiposContratosRoutes.js';
import actividadesRoutes from './module/calificaciones/Routes/ActividadAcademica_Routes.js';
import gradosAcademicosRoutes from './module/calificaciones/Routes/gradosAcademicosRoutes.js';
import especialidadRoutes from './module/calificaciones/Routes/especialidadesRoutes.js';
import asignaturaRoutes from './module/calificaciones/Routes/asignaturasRoutes.js';
import parcialesRoutes from './module/calificaciones/Routes/parcialesRoutes.js';
import gradoRoutes from './module/calificaciones/Routes/gradosRoutes.js';
import ciclosRoutes from './module/calificaciones/Routes/ciclosRoutes.js';
import ponderacionRoutes from './module/calificaciones/Routes/ponderacionesRoutes.js';
import estadoasitenciaRoutes from './module/calificaciones/Routes/estadoAsistenciaRoutes.js';
import asisntenciaRoutes from './module/calificaciones/Routes/asistenciaRoutes.js';
import estadonotaRoutes from './module/calificaciones/Routes/estadoNotaRoutes.js';
import notaRoutes from './module/calificaciones/Routes/notaRoutes.js';
import historialAcademicoRoutes from './module/calificaciones/Routes/historialAcademico.js';
import matriculaRoutes from './module/matricula/Routes/matriculaRoutes.js'; 
import edificiosRoutes from './module/matricula/Routes/edificiosRoutes.js';
import aulasRoutes from './module/matricula/Routes/aulasRoutes.js';
import actividadesextraRoutes from './module/matricula/Routes/actividadesextraRoutes.js';
import solicitudRoutes from './module/matricula/Routes/solicitudRoutes.js';
import pagoRoutes from  "./module/pagosyfinanzas/Routes/pagosFinanzasRoutes.js";
//importtacion de middleware


dotenv.config(); 

const app = express();

const init = async () => {
    try {
        await conectarDB();
        console.log('Base de datos conectada correctamente');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
    }
};

init();

// Middleware para permitir CORS desde cualquier origen
app.use(cors({
    origin: 'http://localhost:3000', // Permitir sólo desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Para permitir cookies en las solicitudes
}));

app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes

// Autenticación y seguridad
// Usar las rutas de usuarios para autenticación y creación de cuentas de usuario
app.use('/api/usuarios', usuariosRoutes); 

// Calificaciones
// Rutas para los profesores para poder agregar, modificar, eliminar y obtener profesores
app.use('/api/profesores', profesoresRoutes); 
// Rutas para tipos de contrato de los profesores 
app.use('/api/contratos', tiposContratoRoutes); 
// Rutas para actividades académicas
app.use('/api/actividadesAcademicas', actividadesRoutes);
// Rutas para grados académicos de los profesores
app.use('/api/gradosAcademicos', gradosAcademicosRoutes);
// Rutas para especialidades de los profesores
app.use('/api/especialidades', especialidadRoutes);
// Rutas para asignaturas de los grados
app.use('/api/asignaturas', asignaturaRoutes);
// Rutas para parciales de las asignaturas
app.use('/api/parciales', parcialesRoutes);
// Rutas para grados de los estudiantes
app.use('/api/grados', gradoRoutes);
// Rutas para ciclos de los grados
app.use('/api/ciclos', ciclosRoutes);
// Rutas para ponderaciones de las notas
app.use('/api/ponderaciones', ponderacionRoutes);
// Rutas para estado de asistencia de los estudiantes
app.use('/api/estadoAsistencia', estadoasitenciaRoutes);
// Rutas para asistencia de los estudiantes
app.use('/api/asistencia', asisntenciaRoutes);
// Rutas para estado de notas de los estudiantes
app.use('/api/estadoNotas', estadonotaRoutes);
// Rutas para notas de los estudiantes
app.use('/api/notas', notaRoutes);
// Rutas para historial académico de los estudiantes
app.use('/api/historialAcademico', historialAcademicoRoutes);

// Matrícula
app.use('/api/matricula', matriculaRoutes); // Usar las rutas de matrícula
// Rutas para el edificio
app.use('/api/edificio', edificiosRoutes);
// Rutas para las aulas
app.use('/api/aula', aulasRoutes);
// Rutas para las actividades extracurriculares
app.use('/api/actividadesExtracurriculares', actividadesextraRoutes);
// Usar las rutas de solicitud
app.use('/api/solicitud', solicitudRoutes);

// Pagos y finanzas
app.use('/api/pagos', pagoRoutes); // Ruta para crear un nuevo pago

// Puerto de la aplicación en el que se ejecutará
const PORT = process.env.PORT || 4000;

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor backend en ejecución en el puerto ${PORT}`);
});
