export default function catchErrorFunc(err: any) {
    if (err.response) {
        // Server responded with a non-2xx status
        return err.response.data;
    } else if (err.request) {
        // Request was made but no response received
        return { error: "No response from the server", message: err.request.statusText };
    } else {
        // Something else happened during the request
        return {
            error: "An error occurred while making the request",
            message: err.response.data.message,
        };
    }
}
