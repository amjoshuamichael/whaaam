use wasm_bindgen::prelude::*;
use std::cmp;

#[wasm_bindgen]
#[allow(dead_code)]
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