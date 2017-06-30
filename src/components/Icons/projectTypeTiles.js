// import React, { PureComponent } from 'react'
//
// export const Defs = () => (
//   <svg width="36px" height="47px" viewBox="0 0 36 47">
//     <defs>
//       <path transform="translate(2,2)" d="M26.3571429,13.4369748 C26.3571429,6.0242437 20.44875,0 13.1785714,0 C5.90839286,0 0,6.0242437 0,13.4369748 C0,23.5147059 13.1785714,38.0714286 13.1785714,38.0714286 C13.1785714,38.0714286 26.3571429,23.5147059 26.3571429,13.4369748 Z" />
//       <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
//         <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1" />
//         <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
//         <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
//         <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1" />
//         <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1" />
//       </filter>
//       <CommunityServices />
//       <Education />
//       <GovernmentServices />
//       <Health />
//       <PoliceAndJustice />
//       <Roads />
//       <Transport />
//       <Utilities />
//     </defs>
//   </svg>
// )
//
// export class ProjectTypeTileIcon extends PureComponent {
//   props: {
//     id: string
//   }
//   render() {
//     const { id } = this.props
//     return (
//       <svg height="28px" width="28px" viewBox="0 0 28 28" style={{ verticalAlign: 'middle' }}>
//         <use xlinkHref={`#${id}`} />
//       </svg>
//     )
//   }
// }
//
// export const CommunityServices = () => {
//   <g id="Community_Services" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//       <g transform="translate(-598.000000, -39.000000)">
//           <g transform="translate(177.000000, 10.000000)">
//               <g transform="translate(421.000000, 29.000000)">
//                   <rect fill="#488645" fill-rule="evenodd" x="0" y="0" width="28" height="28"></rect>
//                   <polygon fill="#FFFFFF" fill-rule="nonzero" points="12 22 12 16 16 16 16 22 21 22 21 14 24 14 14 5 4 14 7 14 7 22"></polygon>
//                   <polygon points="2 2 26 2 26 26 2 26"></polygon>
//               </g>
//           </g>
//       </g>
//   </g>
// }
//
// export const Education = () => {
//   <g id="Education" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//       <g transform="translate(-639.000000, -39.000000)">
//           <g transform="translate(177.000000, 10.000000)">
//               <g transform="translate(462.000000, 29.000000)">
//                   <rectill="#FFCB05" fill-rule="evenodd" x="0" y="0" width="28" height="28"></rect>
//                   <polygon points="1 2 25 2 25 26 1 26"></polygon>
//                   <path d="M6,15.18 L6,19.18 L13,23 L20,19.18 L20,15.18 L13,19 L6,15.18 Z M13,5 L2,11 L13,17 L22,12.09 L22,19 L24,19 L24,11 L13,5 Z" fill="#FFFFFF" fill-rule="nonzero"></path>
//               </g>
//           </g>
//       </g>
//   </g>
// }
//
// export const GovernmentServices = () => {
//   <g id="Government_Services" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//       <g transform="translate(-679.000000, -39.000000)">
//           <g transform="translate(177.000000, 10.000000)">
//               <g transform="translate(502.000000, 29.000000)">
//                   <rect fill="#E377A5" fill-rule="evenodd" x="0" y="0" width="28" height="28"></rect>
//                   <polygon points="2.5 3 26.5 3 26.5 27 2.5 27"></polygon>
//                   <path d="M6.5,13 L6.5,20 L9.5,20 L9.5,13 L6.5,13 Z M12.5,13 L12.5,20 L15.5,20 L15.5,13 L12.5,13 Z M4.5,25 L23.5,25 L23.5,22 L4.5,22 L4.5,25 Z M18.5,13 L18.5,20 L21.5,20 L21.5,13 L18.5,13 Z M14,4 L4.5,9 L4.5,11 L23.5,11 L23.5,9 L14,4 Z" fill="#FFFFFF" fill-rule="nonzero"></path>
//               </g>
//           </g>
//       </g>
//   </g>
// }
//
// export const Health = () => {
//   <g id="Health" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//       <g transform="translate(-720.000000, -39.000000)">
//           <g transform="translate(177.000000, 10.000000)">
//               <g transform="translate(543.000000, 29.000000)">
//                   <rect fill="#ED1C24" fill-rule="evenodd" x="0" y="0" width="28" height="28"></rect>
//                   <polygon points="2 2 26 2 26 26 2 26"></polygon>
//                   <path d="M21,5 L7,5 C5.9,5 5.01,5.9 5.01,7 L5,21 C5,22.1 5.9,23 7,23 L21,23 C22.1,23 23,22.1 23,21 L23,7 C23,5.9 22.1,5 21,5 Z M20,16 L16,16 L16,20 L12,20 L12,16 L8,16 L8,12 L12,12 L12,8 L16,8 L16,12 L20,12 L20,16 Z" fill="#FFFFFF" fill-rule="nonzero"></path>
//               </g>
//           </g>
//       </g>
//   </g>
// }
//
// export const PoliceAndJustice = () => {
//   <g id="Police_and_Justice" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//       <g transform="translate(-760.000000, -39.000000)">
//           <g transform="translate(177.000000, 10.000000)">
//               <g transform="translate(583.000000, 29.000000)">
//                   <rect fill="#2E3192" fill-rule="evenodd" x="0" y="0" width="28" height="28"></rect>
//                   <g></g>
//                   <g stroke-width="1" fill-rule="evenodd">
//                       <g transform="translate(2.000000, 2.000000)">
//                           <g transform="translate(0.958333, 0.000000)">
//                               <path d="M11.0987645,0.0476639398 L18.4731082,0.0476639398 L18.4731082,0.601420782 L18.340741,0.601420782 L20.8986084,6.09132527 L22.188646,6.09132527 L22.188646,6.0975105 L22.188646,6.0975105 C22.188646,8.23491471 20.4559375,9.96762317 18.3185333,9.96762317 L18.3185333,9.96762317 C16.1811291,9.96762317 14.4484206,8.23491471 14.4484206,6.0975105 L14.4484206,6.09132527 L15.7384582,6.09132527 L18.2963256,0.601420782 L11.150366,0.601420782 L12.126353,11.0751369 L10.0622929,11.0751369 L11.0382799,0.601420782 L3.94895476,0.601420782 L3.94895476,0.0476639398 L11.0898814,0.0476639398 L11.094323,0 L11.0987645,0.0476639398 Z M6.45018778,6.09132527 L7.74022533,6.09132527 L7.74022533,6.0975105 C7.74022533,8.23491471 6.00751687,9.96762317 3.87011267,9.96762317 L3.87011267,9.96762317 L3.87011267,9.96762317 C1.73270846,9.96762317 -1.82332688e-16,8.23491471 -4.4408921e-16,6.0975105 L0,6.09132527 L1.29003756,6.09132527 L3.87011267,0.553756843 L6.45018778,6.09132527 Z M18.3185333,1.66127053 L16.2544732,6.09132527 L20.3825934,6.09132527 L18.3185333,1.66127053 Z M3.87011267,1.66127053 L1.80605258,6.09132527 L5.93417276,6.09132527 L3.87011267,1.66127053 Z" fill="#FFFFFF"></path>
//                               <path d="M3.44010015,15.8743628 L18.6453428,15.8743628 L18.6453428,19.1169168 L3.44010015,19.1169168 L3.44010015,15.8743628 Z M3.44010015,12.7364074 L3.44010015,22.066595 L6.46165478,22.066595 L6.46165478,12.7364074 L3.44010015,12.7364074 Z M9.77561792,12.7364074 L9.77561792,22.066595 L12.7971726,22.066595 L12.7971726,12.7364074 L9.77561792,12.7364074 Z M15.6237882,12.7364074 L15.6237882,22.066595 L18.6453428,22.066595 L18.6453428,12.7364074 L15.6237882,12.7364074 Z" fill="#FFFFFF" fill-rule="nonzero"></path>
//                           </g>
//                       </g>
//                   </g>
//               </g>
//           </g>
//       </g>
//   </g>
// }
//
// export const Roads = () => {
//   <g id="Roads" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//       <g transform="translate(-801.000000, -39.000000)">
//           <g transform="translate(177.000000, 10.000000)">
//               <g transform="translate(624.000000, 29.000000)">
//                   <rect fill="#F15A22" x="0" y="0" width="28" height="28"></rect>
//                   <path d="M9.32277736,5 L17.5676299,5.05342237 L22.0286761,22 L5,22 L9.32277736,5 Z M13.0015003,6.9740972 L13.0015003,9.98233859 L14.1295908,9.98233859 L14.1295908,6.9740972 L13.0015003,6.9740972 Z M13.0015003,11.8624894 L13.0015003,14.8707308 L14.1295908,14.8707308 L14.1295908,11.8624894 L13.0015003,11.8624894 Z M13.0015003,17.502942 L13.0015003,20.5111834 L14.1295908,20.5111834 L14.1295908,17.502942 L13.0015003,17.502942 Z" fill="#FFFFFF"></path>
//               </g>
//           </g>
//       </g>
//   </g>
// }
//
// export const Transport = () => {
//   <g id="Transport" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//       <g transform="translate(-841.000000, -39.000000)">
//           <g transform="translate(177.000000, 10.000000)">
//               <g transform="translate(664.000000, 29.000000)">
//                   <g>
//                       <rect fill="#2484C6" fill-rule="evenodd" x="0" y="0" width="28" height="28"></rect>
//                       <path d="M14,5 C10,5 6,5.5 6,9 L6,18.5 C6,20.43 7.57,22 9.5,22 L8,23.5 L8,24 L10.23,24 L12.23,22 L16,22 L18,24 L20,24 L20,23.5 L18.5,22 C20.43,22 22,20.43 22,18.5 L22,9 C22,5.5 18.42,5 14,5 Z M9.5,20 C8.67,20 8,19.33 8,18.5 C8,17.67 8.67,17 9.5,17 C10.33,17 11,17.67 11,18.5 C11,19.33 10.33,20 9.5,20 Z M13,13 L8,13 L8,9 L13,9 L13,13 Z M15,13 L15,9 L20,9 L20,13 L15,13 Z M18.5,20 C17.67,20 17,19.33 17,18.5 C17,17.67 17.67,17 18.5,17 C19.33,17 20,17.67 20,18.5 C20,19.33 19.33,20 18.5,20 Z" fill="#FFFFFF" fill-rule="nonzero"></path>
//                   </g>
//               </g>
//           </g>
//       </g>
//   </g>
// }
//
// export const Utilities = () => {
//   <g id="Utilities" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//       <g transform="translate(-882.000000, -39.000000)">
//           <g transform="translate(177.000000, 10.000000)">
//               <g transform="translate(705.000000, 29.000000)">
//                   <g stroke-width="1" fill="#92C5EB">
//                       <rect x="0" y="0" width="28" height="28"></rect>
//                   </g>
//                   <path d="M9.09331155,16.2612723 C6.27501249,16.2612723 4,13.9862598 4,11.1679608 C4,9.76104223 5.62959914,8.03123926 6.65381983,6.38789096 C7.67804053,4.74454266 9.09331155,2 9.09331155,2 C9.09331155,2 10.1234952,3.99449018 11.5542001,6.26007265 C12.984905,8.52565511 14.1866231,9.72343602 14.1866231,11.1679608 C14.1866231,13.9862598 11.9116106,16.2612723 9.09331155,16.2612723 Z M19.6398443,10.5222567 L23.7657151,10.5222567 L19.9684186,16.826108 L24.3299999,16.826108 L15.262324,26.2950723 L18.0187667,20.087142 L14.268867,20.087142 L19.6398443,10.5222567 Z" fill="#FFFFFF"></path>
//               </g>
//           </g>
//       </g>
//   </g>
// }
