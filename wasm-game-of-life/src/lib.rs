mod utils;

use wasm_bindgen::prelude::*;
use std::cmp;

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
pub fn copy(ain: &mut [f32], aout: &mut [f32], delay: isize) {
    let end_point: usize = cmp::max(0, (ain.len() - 1) as isize + delay) as usize;
    let start_point: usize = cmp::max(0, delay) as usize;
    let out_length: usize = aout.len();

    let mut sample: usize = 0;
    let mut copy_point: usize = - cmp::min(0, delay) as usize;

    while sample < out_length {
        if sample < start_point || sample > end_point {
            aout[sample] = 0.;
        } else {
            aout[sample] = ain[copy_point];
            copy_point += 1;
        }

        sample += 1;
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

#[wasm_bindgen]
pub fn add(afrom: &mut [f32], ato: &mut [f32]) {
    let out_length: usize = ato.len();

    let mut s: usize = 0;
    
    while s < out_length {
        ato[s] += afrom[s];
        s += 1;
    }
}