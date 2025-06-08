const { Paciente, Usuario } = require('../sqlite/entities/paciente.entity.js');
const jwt = require('jsonwebtoken');
const Config = require('../../config/config.js');

// admin de prueba
const adminPrueba = async () => {
  try {
    const adminExists = await Usuario.findOne({ where: { email: "email@gmail.com" } });
    if (!adminExists) {
      await Usuario.create({
        email: "email@gmail.com",
        password: "12345"
      });
      console.log("admin de prueba creado");
    }
  } catch (error) {
    console.error("error al crear admin de prueba", error);
  }
};

adminPrueba();

//obtener todos los pacientes
const getPacientesModel = async () => {
  try {
    const pacientes = await Paciente.findAll();
    return pacientes;
  } catch (error) {
      throw error;
  }
};


const findByEmail = async (email, password) => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        email: email,
        password: password
      }
    });

    if (!usuario) {
      throw new Error("usuario o contraseña incorrectos");
    }

    return usuario;
  } catch (error) {
      throw error;
  }
};


const validate = async (email, password) => {
  try {
    const userFound = await findByEmail(email, password);

    if (!userFound) {
      throw new Error("credenciales incorrectas");
    }

    const payload = {
      userId: userFound.id,
      userEmail: userFound.email
    };

    const token = jwt.sign(payload, Config.secreteWord, {
      expiresIn: Config.expiresIn
    });

    return token;
  } catch (error) {
      throw error;
  }
};


const createPaciente = async (paciente) => {
  try {
    if (!paciente.name) {
      throw new Error("el nombre del paciente es obligatorio");
    }
    
    if (!paciente.email) {
      throw new Error("el email del paciente es obligatorio");
    }
    
    const pacienteExistente = await Paciente.findOne({
      where: { email: paciente.email }
    });

    if (pacienteExistente) {
      throw new Error("el paciente ya existe");
    }

    const nuevoPaciente = await Paciente.create({
      name: paciente.name,
      email: paciente.email
    });

    return nuevoPaciente;
  } catch (error) {
    throw error;
  }
};

const updatePaciente = async (id, paciente) => {
  try {
    if (!paciente.name) {
      throw new Error("el nombre del paciente es obligatorio");
    }
    
    if (!paciente.email) {
      throw new Error("el email del paciente es obligatorio");
    }
    
    const pacienteEncontrado = await Paciente.findByPk(id);

    if (!pacienteEncontrado) {
      throw new Error(`No se encuentra paciente con id ${id}`);
    }

    await pacienteEncontrado.update({
      name: paciente.name,
      email: paciente.email
    });

    return pacienteEncontrado;
  } catch (error) {
    throw error;
  }
};


const deletePaciente = async (id) => {
  try {
    const pacienteEncontrado = await Paciente.findByPk(id);

    if (!pacienteEncontrado) {
      throw new Error(`No se encuentra paciente con id ${id}`);
    }

    await pacienteEncontrado.destroy();
    return pacienteEncontrado;
  } catch (error) {
    throw error;
  }
};

const getPacienteById = async (id) => {
  try {
    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
      throw new Error(`No se encuentra paciente con id ${id}`);
    }

    return paciente;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPacientesModel,
  validate,
  createPaciente,
  updatePaciente,
  deletePaciente,
  getPacienteById
};
