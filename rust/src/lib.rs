use wasm_bindgen::prelude::*;
// use web_sys::console;
extern crate rustfft;
use rustfft::{FftPlanner, num_complex::Complex};
use std::f32::consts::PI;

fn ifft(freqs: Vec<Complex<f32>>) -> Vec<Complex<f32>> {
    // copy the frequences
    let mut freqs = freqs.clone();
    // create planner and plan an inverse fft
    let mut planner = FftPlanner::new();
    let ifft = planner.plan_fft_inverse(freqs.len());
    // perform inverse fft in place
    ifft.process(&mut freqs);
    // don't need to normalize
    freqs 
}


fn single_freq_tseries(k: f32, c_k: f32, max_k: i32) -> Vec<Complex<f32>> {
    let signal: Vec<Complex<f32>> = (0..max_k)
        .map(|n| {
            let t = n as f32 / max_k as f32; // time corresponding to sample n
            Complex::new(0.0, 2.0 * PI * k * t).exp() * c_k
        })
        .collect();

    signal
}

#[wasm_bindgen]
pub fn create_lines(freqs: &[f32], k: f32, line_length: f32, arrowheads: bool) -> *const f32 {
    let max_k = freqs.len() as i32;

    // Map frequencies to complex numbers with an imaginary part of 0
    let freqs: Vec<Complex<f32>> = freqs.iter().map(|&c_k| Complex::new(c_k, 0.0)).collect();

    // Centers are obtained from the inverse FFT
    let centers: Vec<Complex<f32>> = ifft(freqs);

    // Get the delta values based on the frequency series
    let delta: Vec<Complex<f32>> = single_freq_tseries(k, line_length / 2.0, max_k);

    // Create the lines by calculating the start and end points for each line
    // 3 floats per point (x, y, alongline)
    // 2 points per line
    // 6 floats per line
    // WITH arrowheads: 6 points per line; 18 floats per line
    let floats_per_line = if arrowheads { 18 } else { 6 };
    let mut lines = Vec::with_capacity(floats_per_line * max_k as usize);

    let rot_135 = Complex::new(-0.70710678118, 0.70710678118);
    let rot_135_back = Complex::new(-0.70710678118, -0.70710678118);

    let tail_length = 0.1; // 10% of the line length

    for i in 0..max_k as usize {
        let start = centers[i] - delta[i];
        let end = centers[i] + delta[i];
        lines.push(start.re);
        lines.push(start.im);
        lines.push(0.0);
        lines.push(end.re);
        lines.push(end.im);
        lines.push(1.0);

        if arrowheads {
            let tail_1_start = end + tail_length * (end - start) * rot_135;
            let tail_2_start = end + tail_length * (end - start) * rot_135_back;
            lines.push(tail_1_start.re);
            lines.push(tail_1_start.im);
            lines.push(1.0);
            lines.push(end.re);
            lines.push(end.im);
            lines.push(1.0);
            lines.push(tail_2_start.re);
            lines.push(tail_2_start.im);
            lines.push(1.0);
            lines.push(end.re);
            lines.push(end.im);
            lines.push(1.0);
        }

    }

    // Return a pointer to the array
    let leaked_lines = Box::leak(lines.into_boxed_slice());
    // TODO: check if this is leaking memory since this is called at 60fps
    leaked_lines.as_ptr()

}
