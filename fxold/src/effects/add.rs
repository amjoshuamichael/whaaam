use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(afrom: &mut [f32], atop: &mut [f32]) {
    let out_length: usize = atop.len();

    let mut s: usize = 0;
    
    while s < out_length {
        atop[s] += afrom[s];
        s += 1;
    }
}