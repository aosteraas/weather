#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;

use rocket_contrib::json::JsonValue;
use rocket_contrib::json::Json;
mod location;
use location::{Location};

#[post("/", format="json", data ="<location>")]
fn location(location: Json<Location>) -> Json<Location> {
    let loc = Location{
        lat : location.lat,
        lon : location.lon,
    };
    Json(loc)
}

#[get("/")]
fn get_json() -> JsonValue {
    json!({
        "key": "value",
        "array": [1, 2, 3, 4]
    })
}

fn main() {
    rocket::ignite()
        .mount("/api/", routes![get_json, location])
        .launch();
}
