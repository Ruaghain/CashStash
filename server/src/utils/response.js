module.exports = {
  responsePayload: function (err, result, response, message, code) {
    if (err) {
      return response.status(500).json({
        data: err,
        message: 'An error occurred',
      })
    }

    response.status(code).json({
      data: result,
      message: message
    })
  }
};
