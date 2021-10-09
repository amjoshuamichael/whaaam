mod utils;

use wasm_bindgen::prelude::*;

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

#[wasm_bindgen]
pub fn delay(ain: &mut [f32], aout: &mut [f32]) {
    let in_length: usize = ain.len();
    let out_length: usize = aout.len();

    let delay: usize = 30000;

    let mut s: usize = 0;

    while s < out_length {
        if s < delay || s > in_length {
            aout[s] = 0.;
        } else {
            aout[s] = ain[s - delay];
        }

        s += 1;
    }
}