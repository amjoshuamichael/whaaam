use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn reverb(ain: &mut [f32], aout: &mut [f32], delay: usize, feedback: f32, sample_rate: usize) {
    let b: usize = sample_rate * delay;

    let fg_0: f32 = feedback - 0.013;
    let fg_1: f32 = feedback + 0.005;
    let fg_2: f32 = feedback + 0.017;
    let fg_3: f32 = feedback - 0.007;
    let pg_0: f32 = 0.7;
    let pg_1: f32 = 0.7;
    let fd_0: usize = delay;
    let fd_1: usize = delay + 101;
    let fd_2: usize = delay - 43;
    let fd_3: usize = delay + 87;
    let pd_0: usize = 1051;
    let pd_1: usize = 337;

    let out_length: usize = aout.len();
    let mut s: usize = fd_0.max(fd_1).max(fd_2).max(fd_3).max(pd_0).max(pd_1) + 1;

    let mut fa_0 = vec![0.; out_length];
    let mut fa_1 = vec![0.; out_length];
    let mut fa_2 = vec![0.; out_length];
    let mut fa_3 = vec![0.; out_length];

    let mut fsum = vec![0.; out_length];

    let mut pa_0 = vec![0.; out_length];

    while s < out_length {
        fa_0[s] = ain[s] + fg_0 * fa_0[s - fd_0];
        fa_1[s] = ain[s] + fg_1 * fa_1[s - fd_1];
        fa_2[s] = ain[s] + fg_2 * fa_2[s - fd_2];
        fa_3[s] = ain[s] + fg_3 * fa_3[s - fd_3];

        fsum[s] = fa_0[s] + fa_1[s] + fa_2[s] + fa_3[s];

        // pa_0[s] = (- pg_0 * fsum[s]) + fsum[s - pd_0] + (pg_0 * pa_0[s - pd_0]);
        // aout[s] = (- pg_1 * pa_0[s]) + pa_0[s - pd_1] + (pg_1 * aout[s - pd_1]);

        s += 1;
    }
}