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
pub fn copy(ain: &mut [f32], aout: &mut [f32], delay: usize) {
    let end_point: usize = ain.len() - 1 + delay;
    let out_length: usize = aout.len();

    let mut s: usize = 0;

    while s < out_length {
        if s < delay || s > end_point {
            aout[s] = 0.;
        } else {
            aout[s] = ain[s - delay];
        }

        s += 1;
    }
}

#[wasm_bindgen]
pub fn bitcrush(ain: &mut [f32], aout: &mut [f32], amount: usize) {
    let in_length: usize = ain.len();
    let out_length: usize = aout.len();

    let mut s: usize = 0;

    let amount2 = amount / 2;
    let amount3 = amount / 3;

    while s < out_length {
        if s > in_length {
             aout[s] = 0.;
        } else {
            aout[s] = 
                (ain[s - s % amount] 
                + ain[s - s % amount2]
                + ain[s - s % amount3]) / 3.;
        }

        s += 1;
    }
}