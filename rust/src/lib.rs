use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn generate_points() -> *const f32 {
    // Create an array of points: (1,1), (2,2), (3,3)
    // let points: [f32; 6] = [1.0, 1.0, 2.0, 2.0, 3.0, 3.0];
    let points: Vec<f32> = vec![1.0, 1.0, 22.0, 22.0, 43.0, 43.0]; // intentionally leak memory so that javascript can access it
    let leaked_points = Box::leak(points.into_boxed_slice());

    // Return a pointer to the array
    leaked_points.as_ptr()
}
