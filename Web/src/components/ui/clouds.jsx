// // VantaBackground.jsx
// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import CLOUDS from "vanta/dist/vanta.clouds.min.js";
// 
// const VantaBackground = () => {
//   const vantaRef = useRef(null);
//   const vantaEffect = useRef(null);
// 
//   useEffect(() => {
//     if (typeof window !== "undefined" && !vantaEffect.current) {
//       vantaEffect.current = CLOUDS({
//         el: vantaRef.current,
//         THREE,
//         mouseControls: false,
//         touchControls: false,
//         gyroControls: false,
//         scale: 1.0,
//         scaleMobile: 1.0,
//       });
//     }
// 
//     return () => {
//       if (vantaEffect.current) {
//         vantaEffect.current.destroy();
//         vantaEffect.current = null;
//       }
//     };
//   }, []);
// 
//   return <div ref={vantaRef} className="absolute   inset-0 -z-1" />;
// };
// 
// export default VantaBackground;
