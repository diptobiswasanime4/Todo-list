use serde::Deserialize;
use tokio::net::TcpListener;
use axum::{
    Router,
    routing::get,
    response::{Html, IntoResponse},
    extract::{Query, Path},
};

mod error;
mod web;
mod model;
use crate::model::ModelController;

pub use self::error::{Error, Result};

#[derive(Debug, Deserialize)]
struct HelloParams {
    name: Option<String>
}

#[tokio::main]
async fn main() -> Result<()> {
    let mc = ModelController::new().await?;


    let app = Router::new()
    .route("/hello", get(handler_hello))
    .route("/hello_params", get(handler_hello_params))
    .route("/hello_path/:name", get(handler_hello_path))
    .nest("/", web::routes_tickets::routes(mc.clone()))
    .merge(web::routes_login::routes());


    let listener = TcpListener::bind("127.0.0.1:3000").await.unwrap();

    println!("App running on Port {:?}", listener.local_addr());

    axum::serve(listener, app).await.unwrap();

    Ok(())
}

async fn handler_hello() -> impl IntoResponse {
    Html("<h1>Hello World.</h1>")
}

async fn handler_hello_params(Query(params): Query<HelloParams>) -> impl IntoResponse {
    let name = params.name.as_deref().unwrap_or("Bro");

    Html(format!("<h1>Hello {name}</h1>"))
}

async fn handler_hello_path(Path(name): Path<String>) -> impl IntoResponse {    
    Html(format!("<h1>Hello {name}</h1>"))
}