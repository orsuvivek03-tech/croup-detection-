// Generates realistic synthetic leaf images for 1-click model testing
export function generateSampleLeaf(
  type: 'tomato_early_blight' | 'potato_late_blight' | 'corn_rust' | 'healthy' | 'non_leaf'
): string {
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  if (type === 'non_leaf') {
    // Generate a gray/blue smartphone / laptop surface
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 320, 320);

    // Screen
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(30, 40, 260, 220);

    // Blue code lines / synthetic elements
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(50, 70, 120, 12);
    ctx.fillRect(50, 95, 180, 10);
    ctx.fillRect(50, 115, 140, 10);
    ctx.fillRect(50, 140, 200, 10);

    // Metallic trim
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 40, 260, 220);

    return canvas.toDataURL('image/jpeg', 0.9);
  }

  // Draw natural plant leaf background
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(0, 0, 320, 320);

  // Draw Leaf Base (Leaf geometry)
  ctx.save();
  ctx.translate(160, 160);

  ctx.beginPath();
  if (type === 'corn_rust') {
    // Long elongated corn leaf
    ctx.moveTo(0, -140);
    ctx.quadraticCurveTo(55, -20, 40, 130);
    ctx.quadraticCurveTo(0, 150, -40, 130);
    ctx.quadraticCurveTo(-55, -20, 0, -140);
  } else {
    // Broad tomato/potato leaflet
    ctx.moveTo(0, -135);
    ctx.bezierCurveTo(90, -90, 115, 60, 0, 140);
    ctx.bezierCurveTo(-115, 60, -90, -90, 0, -135);
  }

  // Foliage Green Gradient
  const grad = ctx.createLinearGradient(0, -140, 0, 140);
  grad.addColorStop(0, '#2e7d32');
  grad.addColorStop(0.5, '#388e3c');
  grad.addColorStop(1, '#1b5e20');
  ctx.fillStyle = grad;
  ctx.fill();

  // Leaf veins
  ctx.strokeStyle = '#66bb6a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -130);
  ctx.lineTo(0, 130);
  ctx.stroke();

  // Lateral veins
  ctx.lineWidth = 1.5;
  for (let y = -90; y <= 90; y += 30) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(45, y - 20);
    ctx.moveTo(0, y);
    ctx.lineTo(-45, y - 20);
    ctx.stroke();
  }

  // Add specific disease symptoms
  if (type === 'tomato_early_blight') {
    // Concentric target spots with yellow halos
    const spots = [
      { x: -30, y: -20, r: 24 },
      { x: 35, y: 30, r: 20 },
      { x: -15, y: 65, r: 16 },
    ];

    spots.forEach((s) => {
      // Yellow chlorotic halo
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r + 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(234, 179, 8, 0.7)';
      ctx.fill();

      // Outer necrotic ring
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = '#5c2c16';
      ctx.fill();

      // Concentric rings
      ctx.strokeStyle = '#3e1c0c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 0.7, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = '#261107';
      ctx.fill();
    });
  } else if (type === 'potato_late_blight') {
    // Large dark irregular water-soaked lesions with pale edges
    ctx.fillStyle = '#27272a';
    ctx.beginPath();
    ctx.ellipse(30, -30, 45, 30, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#3f3f46';
    ctx.beginPath();
    ctx.ellipse(-35, 40, 40, 25, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();

    // Pale whitish mildew fuzz simulation
    ctx.strokeStyle = 'rgba(244, 244, 245, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (type === 'corn_rust') {
    // Small powdery cinnamon-brown pustules
    for (let i = 0; i < 40; i++) {
      const px = (Math.sin(i * 3) * 28);
      const py = -100 + i * 5;
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.ellipse(px, py, 4, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
  return canvas.toDataURL('image/jpeg', 0.92);
}
