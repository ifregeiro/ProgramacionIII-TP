const errorHandler = (err, req, res, next) => {
  console.error("Error stack:", err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Error de validación",
      details: err.errors?.map(e => e.message) || [err.message]
    });
  }

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Error de validación en base de datos",
      details: err.errors?.map(e => e.message) || [err.message]
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      error: "Error duplicado",
      details: "El recurso ya existe"
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Token inválido"
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Token expirado"
    });
  }

  res.status(err.status || 500).json({
    error: err.message || "Error interno del servidor",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = {
  errorHandler,
  notFound
};
