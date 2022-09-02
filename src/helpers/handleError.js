const handleError = (message = "internal error server", status = 500) => {

    const error = new Error(message);
    error.statusCode = status;
    res.status(status).json({ message });
    throw error;

}