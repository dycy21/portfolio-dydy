// --- 1. THREE.JS ENGINE ---
let scene, camera, renderer, particlesMesh, material;

const initThree = () => {
    const canvas = document.querySelector('#bg-canvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 30;

    const geometry = new THREE.BufferGeometry();
    const count = 1500;
    const pos = new Float32Array(count * 3);
    for(let i=0; i<count*3; i++) pos[i] = (Math.random() - 0.5) * 80;
    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const isDark = document.documentElement.classList.contains('dark');
    material = new THREE.PointsMaterial({
        size: 0.08,
        color: isDark ? '#3b82f6' : '#2563eb',
        transparent: true,
        opacity: 0.4
    });

    particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    const animate = () => {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    };
    animate();
};

// --- 2. THEME & NAVBAR ---
const initUI = () => {
    const btn = document.getElementById('theme-toggle');
    const nav = document.getElementById('navbar');

    // Scroll Listener for Glassmorphism
    window.addEventListener('scroll', () => {
        // Trigger the effect after 40px of scrolling
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    const updateUI = () => {
        const isDark = document.documentElement.classList.contains('dark');
        btn.innerHTML = isDark ? 
            `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/></svg>` : 
            `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
        
        if(material) material.color.set(isDark ? '#3b82f6' : '#2563eb');
    };

    btn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        updateUI();
    });

    // Check preference
    if(localStorage.getItem('theme') === 'light') document.documentElement.classList.remove('dark');
    updateUI();
};
document.addEventListener('DOMContentLoaded', () => {
    initThree();
    initUI();
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});