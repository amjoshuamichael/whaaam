use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn delay(ain: &mut [f32], aout: &mut [f32], delay: usize, feedback: f32, sample_rate: usize) {
    let mut s: usize = delay;

    let out_length: usize = aout.len();

    while s < out_length {
        aout[s] = ain[s] + aout[s - delay] * feedback;

        s += 1;
    }
}