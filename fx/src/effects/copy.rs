use wasm_bindgen::prelude::*;
use std::cmp;
use web_sys::console;

#[wasm_bindgen] #[allow(dead_code)]
pub fn copy(ain: &mut [f32], aout: &mut [f32],
            delay: isize, start_offset: usize, end_offset: usize) {
    let mut s = 0;
    let start = cmp::max(0, delay + start_offset as isize) as usize;
    loop {
        s += 1;
        if s >= start { break; }

        aout[s] = 0.;
    }

    let mut copy_point = if delay > 0 { start_offset }
                                else { cmp::max(start_offset, (- delay) as usize) };
    let sound_end = ain.len() - end_offset;
    loop {
        s += 1;
        copy_point += 1;
        if copy_point >= sound_end { break; }
        aout[s] = ain[copy_point];
    }

    let out_length = aout.len();
    loop {
        s += 1;
        if s >= out_length { break; }
        aout[s] = 0.;
    }
}