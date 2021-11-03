use wasm_bindgen::prelude::*;
use std::f32;
extern crate web_sys;

#[wasm_bindgen] #[allow(dead_code)]
pub fn flanger(ain: &mut [f32], aout: &mut [f32], speed: f32) {
    let max_sample_point = 202.;
    let min_sample_point = 2.;
    let mut sample_offset: f32 = min_sample_point;
    let mut sample_point_dir = true;

    let out_length = aout.len();
    let mut s = 10;

    while s < out_length {
        if sample_offset > max_sample_point {
            sample_point_dir = false;
        } else if sample_offset < min_sample_point {
            sample_point_dir = true;
        }

        if sample_point_dir {
            sample_offset += speed;
        } else {
            sample_offset -= speed;
        }

        let mut sample_point = s - (sample_offset as usize).min(s);

        aout[s] = ain[s] + ain[sample_point] + aout[sample_point - 3] * 0.5;

        s += 1;
    }
}