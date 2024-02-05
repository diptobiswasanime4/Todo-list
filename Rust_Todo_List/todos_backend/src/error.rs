use axum::response::{IntoResponse, Response};

pub type Result<T> = core::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error {
    InternalServerError,
}

impl IntoResponse for Error {
    fn into_response(self) -> Response {
        ("500 Internal Server Error").into_response()
    }
}
