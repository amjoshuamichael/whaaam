use wasm_bindgen::prelude::*;
use std::f32::consts;

#[wasm_bindgen]
pub fn filter(ain: &mut [f32], aout: &mut [f32], frequency: f32, q: f32, sample_rate: usize) {
    let k: f32 = (consts::PI * frequency / sample_rate as f32).tan();
    let norm: f32 = 1.0 / (1. + k / q + k * k);
    
    let i0: f32 = k * k * norm;
    let i1: f32 = 2.0 * i0;
    let i2: f32 = i0;
    let o1: f32 = 2. * (k * k - 1.) * norm;
    let o2: f32 = (1. - k / q + k * k) * norm;   

    let out_length: usize = aout.len();
    let mut s: usize = 120;

    while s < out_length {
        aout[s] = 
            i0 * ain[s]
            + i1 * ain[s - 1]
            + i2 * ain[s - 2]
            - o1 * aout[s - 1]
            - o2 * aout[s - 2];
                
        s += 1;
    }
}
