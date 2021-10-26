use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(afrom: &mut [f32], ato: &mut [f32]) {
    let out_length: usize = ato.len();

    let mut s: usize = 0;
    
    while s < out_length {
        ato[s] += afrom[s];
        s += 1;
    }
}