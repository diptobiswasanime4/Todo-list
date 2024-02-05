use crate::model::{ModelController, Ticket, TicketForCreate};
use crate::Result;
use axum::{
    Json,
    extract::{State, Path},
    routing::{get, post, delete},
    Router,
};

async fn create_ticket(
    mc: State<ModelController>,
    Json(ticket_fc): Json<TicketForCreate>
) -> Result<Json<Ticket>> {

    let ticket = mc.create_ticket(ticket_fc).await?;

    Ok(Json(ticket))
}

async fn list_tickets(
    State(mc): State<ModelController>,
) -> Result<Json<Vec<Ticket>>> {

    let tickets = mc.list_tickets().await?;

    Ok(Json(tickets))
}

async fn delete_ticket(
    mc: State<ModelController>,
    Path(id): Path<u64>
) -> Result<Json<Ticket>> {
    let ticket = mc.delete_ticket(id).await?;

    Ok(Json(ticket))
}

pub fn routes(mc: ModelController) -> Router {
    Router::new()
        .route("/tickets", post(create_ticket).get(list_tickets))
        .route("/tickets/:id", delete(delete_ticket))
        .with_state(mc)
}