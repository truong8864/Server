const httpStatus = require("http-status");

const ExtendableError = require("./ExtendableError")

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class DuplicateError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message = "Wrong format",
    errors,
    fields,
    values,
    type,
    reason,
    stack,
    status = httpStatus.BAD_REQUEST,
    isPublic = false,
  }) {
    super({
      message,
      errors,
      fields,
      values,
      type,
      reason,
      status,
      isPublic,
      stack
    });
  }
}

module.exports = DuplicateError;
