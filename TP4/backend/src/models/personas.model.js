class PersonasModel {
    constructor() {
        this.personas = [
            {
                "id": 1,
                "nombre": "Ana",
                "apellido": "García",
                "edad": 28,
                "email": "ana.garcia@ejemplo.com"
            },
            {
                "id": 2,
                "nombre": "Carlos",
                "apellido": "Martínez",
                "edad": 35,
                "email": "carlos.martinez@correo.net"
            },
            {
                "id": 3,
                "nombre": "María",
                "apellido": "López",
                "edad": 42,
                "email": "maria.lopez@mail.org"
            },
            {
                "id": 4,
                "nombre": "Javier",
                "apellido": "Rodríguez",
                "edad": 31,
                "email": "jrodriguez@dominio.es"
            },
            {
                "id": 5,
                "nombre": "Laura",
                "apellido": "Fernández",
                "edad": 24,
                "email": "lfernandez@email.com"
            }
        ];
    }

    async getPersonas() {
        return this.personas;
    }
}

module.exports = new PersonasModel();
