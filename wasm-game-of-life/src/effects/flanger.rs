use wasm_bindgen::prelude::*;

#[wasm_bindgen] #[allow(dead_code)]
pub fn flanger(ain: &mut [f32], aout: &mut [f32], speed: f32) {
    let out_length: usize = aout.len();

    let mut s: usize = 100;

    let speedover2 : f32 = speed / 2.;

    while s < out_length {
        let s_f32 = s as f32;
        let sample_point: usize = (s_f32 - (s_f32 % speed - speedover2).abs() / 75.) as usize;
        aout[s] = ain[s] + ain[sample_point] + aout[(sample_point + 2).max(75).min(100) as usize] / 2.;

        s += 1;
    }
}