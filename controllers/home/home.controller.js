
// controladores
const home = async (req, res) => {
    res.render('index', { 
        title: 'Clínica Salud+ - Gestión de Turnos',
        message: 'Turnos y Pacientes',
        showFeatures: true,
        features: [
            'Descripción de la característica 1' ,
            'Descripción de la característica 2',
            'Descripción de la característica 3'
            
        ]
    });
}
module.exports = {
   home
}



