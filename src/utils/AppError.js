// src/utils/AppError.js

class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Hérite du message de la classe Error native
    this.statusCode = statusCode;
    
    // Capture la stack trace proprement (aide au débogage)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;