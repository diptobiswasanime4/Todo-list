use tokio::net::TcpListener;
use axum::{
    http::Method,
    Router,
    routing::{get, post, delete, put},
    extract::{State, Path},
    Json
};
use tower_http::{cors::{Any, CorsLayer}};

mod error;
mod model;

pub use self::error::{Error, Result};

use crate::model::{ModelController, Todo, TodoForCreate};

#[tokio::main]
async fn main() -> Result<()> {
    
    let cors = CorsLayer::new()
    .allow_methods([Method::GET, Method::POST])
    .allow_origin(Any);
    
    let mc = ModelController::new().await?;

    let app = Router::new().nest("/", routes(mc.clone()))
    .layer(CorsLayer::permissive());

    let listener = TcpListener::bind("127.0.0.1:3000").await.unwrap();

    println!("App running on Port {:?}", listener.local_addr());

    axum::serve(listener, app).await.unwrap();

    Ok(())
}

async fn create_todo(
    mc: State<ModelController>,
    Json(todo_fc): Json<TodoForCreate>
) -> Result<Json<Todo>> {
    let todo = mc.create_todo(todo_fc).await?;

    Ok(Json(todo))
}

async fn list_todos (
    mc: State<ModelController>
) -> Result<Json<Vec<Todo>>> {
    let todos = mc.list_todos().await?;

    Ok(Json(todos))
}

async fn delete_todo (
    mc: State<ModelController>,
    Path(id): Path<u64>
) -> Result<Json<Todo>> {
    let todo = mc.delete_todo(id).await?;

    Ok(Json(todo))
}

// async fn edit_todo (
//     mc: State<ModelController>,
//     Json(todo_fc): Json<TodoForCreate>,
//     Path(id): Path<u64>
// ) -> Result<Json<Todo>> {
//     let todo = mc.edit_todo(todo_fc, id).await?;

//     Ok(Json(todo))
// }

fn routes(mc: ModelController) -> Router {
    Router::new()
        .route("/todos", post(create_todo).get(list_todos))
        .route("/todos/:id", delete(delete_todo))
        .with_state(mc)
}