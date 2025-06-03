console.log('Hello World!');

// Lorenz attractor GIF animation in a canvas, loop 5s
window.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('lorenz-gif-container');
  if (!container) return;
  const width = 320, height = 320;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.background = '#000004';
  canvas.style.borderRadius = '12px';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // Lorenz parameters
  const sigma = 10, rho = 28, beta = 8/3;
  const dt = 0.008;
  const steps = 5000;
  const totalTime = 5; // seconds
  const frames = 60 * totalTime;
  let points = [];
  let x = 0.01, y = 0, z = 0;
  // Precompute points
  for (let i = 0; i < steps; i++) {
    let dx = sigma * (y - x);
    let dy = x * (rho - z) - y;
    let dz = x * y - beta * z;
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;
    points.push([x, y, z]);
  }
  // Animation
  function draw(frame) {
    ctx.clearRect(0, 0, width, height);
    // Color gradient (Inferno colormap)
    const inferno = [
      '#000004','#1b0c41','#4a0c6b','#781c6d','#a52c60','#cf4446','#ed6925','#fb9b06','#f7d13d','#fcffa4'
    ];
    // Ajuste vertical para centralizar melhor o atrator
    const yOffset = 180; // valor positivo move para baixo
    for (let i = 1; i < points.length; i++) {
      let t = (i + frame * (points.length/frames)) % points.length;
      let prev = points[Math.floor((t-1+points.length)%points.length)];
      let curr = points[Math.floor(t)];
      // Project
      let px = width/2 + curr[0]*7;
      let py = height/2 - curr[2]*7 + yOffset;
      let ppx = width/2 + prev[0]*7;
      let ppy = height/2 - prev[2]*7 + yOffset;
      // Color by position in trajectory
      let cidx = Math.floor(9 * i / points.length);
      ctx.strokeStyle = inferno[cidx];
      ctx.beginPath();
      ctx.moveTo(ppx, ppy);
      ctx.lineTo(px, py);
      ctx.stroke();
    }
  }
  let frame = 0;
  function animate() {
    draw(frame);
    frame = (frame + 1) % frames;
    requestAnimationFrame(animate);
  }
  animate();
});
