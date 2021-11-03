mod utils;

use wasm_bindgen::prelude::*;
use std::vec::Vec;
mod effects;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn greet() -> String {
    "Hello, waap!".into()
}

#[wasm_bindgen]
pub fn take_number_slice_by_shared_ref(x: &mut [f64]) {
    x[1] = 4.;
}