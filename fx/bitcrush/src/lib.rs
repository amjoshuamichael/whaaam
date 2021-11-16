use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn bitcrush(ain: &mut [f32], aout: &mut [f32], amount: usize, sampleRate: usize) {
    let in_length: usize = ain.len();
    let out_length: usize = aout.len();

    let mut s: usize = 0;

    while s < out_length {
        if s > in_length {
             aout[s] = 0.;
        } else {
            aout[s] = ain[s - s % amount];
        }

        s += 1;
    }
}