use wasm_bindgen::prelude::*;
use std::cmp;

#[wasm_bindgen] #[allow(dead_code)]
pub fn copy(ain: &mut [f32], aout: &mut [f32],
            delay: isize,
            start_offset: isize, end_offset: isize,
            fade_in_offset: isize, fade_out_offset: isize) {
    let mut s = 0;

    let sound_start = delay + start_offset;
    while s < sound_start {
        aout[s as usize] = 0.;

        s += 1;
    }

    let mut sound_copy_point = start_offset;

    let fade_in_slope = fade_in_offset as f32;
    let fade_in_end = sound_start + fade_in_offset;
    while s < fade_in_end {
        let fade = (s - sound_start) as f32 / fade_in_slope;

        aout[s as usize] = ain[sound_copy_point as usize] * smooth(fade);
        sound_copy_point += 1;

        s += 1;
    }

    let sound_end = ain.len() as isize - end_offset + delay;
    let fade_out_start = sound_end - fade_out_offset;
    while s < fade_out_start {
        aout[s as usize] = ain[sound_copy_point as usize];
        sound_copy_point += 1;

        s += 1;
    }

    let fade_out_slope = fade_out_offset as f32;
    while s < sound_end {
        let fade = 1. - (s - fade_out_start) as f32 / fade_out_slope;

        aout[s as usize] = ain[sound_copy_point as usize] * smooth(fade);
        sound_copy_point += 1;

        s += 1;
    }

    let out_length = aout.len() as isize;
    while s < out_length {
        aout[s as usize] = 0.;

        s += 1;
    }
}

fn smooth(input: f32) -> f32 { 3. * input * input - 2. * input * input * input }