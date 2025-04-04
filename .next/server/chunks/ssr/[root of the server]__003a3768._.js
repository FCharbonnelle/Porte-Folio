module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/components/ScrollProgressBar.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ScrollProgressBar": (()=>ScrollProgressBar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function ScrollProgressBar() {
    const [scrollProgress, setScrollProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleScroll = ()=>{
            const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const currentScroll = window.scrollY;
            if (totalScroll) {
                setScrollProgress(currentScroll / totalScroll * 100);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return ()=>{
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "scroll-progress",
        style: {
            width: `${scrollProgress}%`
        }
    }, void 0, false, {
        fileName: "[project]/src/components/ScrollProgressBar.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/utils/mouseEffect.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// /**
//  * Utilitaire pour l'effet de souris personnalisé
//  */
__turbopack_context__.s({
    "initMouseEffect": (()=>initMouseEffect)
});
function initMouseEffect() {} // export function initMouseEffect() {
 //   if (typeof document === 'undefined') return;
 //   // Création des éléments pour l'effet de souris
 //   const cursor = document.createElement('div');
 //   const cursorFollower = document.createElement('div');
 //   // Configuration du curseur principal
 //   cursor.classList.add('cursor');
 //   cursor.style.position = 'fixed';
 //   cursor.style.width = '10px';
 //   cursor.style.height = '10px';
 //   cursor.style.borderRadius = '50%';
 //   cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
 //   cursor.style.pointerEvents = 'none';
 //   cursor.style.zIndex = '9999';
 //   cursor.style.transform = 'translate(-50%, -50%)';
 //   // Configuration du suiveur de curseur
 //   cursorFollower.classList.add('cursor-follower');
 //   cursorFollower.style.position = 'fixed';
 //   cursorFollower.style.width = '30px';
 //   cursorFollower.style.height = '30px';
 //   cursorFollower.style.borderRadius = '50%';
 //   cursorFollower.style.border = '1px solid rgba(255, 255, 255, 0.5)';
 //   cursorFollower.style.pointerEvents = 'none';
 //   cursorFollower.style.zIndex = '9998';
 //   cursorFollower.style.transform = 'translate(-50%, -50%)';
 //   cursorFollower.style.transition = 'transform 0.1s ease';
 //   // Ajout au DOM
 //   document.body.appendChild(cursor);
 //   document.body.appendChild(cursorFollower);
 //   // Gestionnaire de mouvement de souris
 //   function onMouseMove(e) {
 //     cursor.style.left = `${e.clientX}px`;
 //     cursor.style.top = `${e.clientY}px`;
 //     // Animation douce pour le suiveur
 //     setTimeout(() => {
 //       cursorFollower.style.left = `${e.clientX}px`;
 //       cursorFollower.style.top = `${e.clientY}px`;
 //     }, 50);
 //   }
 //   // Gestionnaire pour les hover sur les liens et boutons
 //   function addHoverEffects() {
 //     const interactiveElements = document.querySelectorAll('a, button');
 //     interactiveElements.forEach(el => {
 //       el.addEventListener('mouseenter', () => {
 //         cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
 //         cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
 //       });
 //       el.addEventListener('mouseleave', () => {
 //         cursor.style.transform = 'translate(-50%, -50%) scale(1)';
 //         cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
 //       });
 //     });
 //   }
 //   // Ajout des écouteurs d'événements
 //   document.addEventListener('mousemove', onMouseMove);
 //   addHoverEffects();
 //   // Cacher le curseur par défaut
 //   document.body.style.cursor = 'none';
 //   // Fonction de nettoyage pour React
 //   return () => {
 //     document.removeEventListener('mousemove', onMouseMove);
 //     document.body.removeChild(cursor);
 //     document.body.removeChild(cursorFollower);
 //     document.body.style.cursor = 'auto';
 //   };
 // } 
}}),
"[project]/src/components/MouseEffectProvider.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MouseEffectProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mouseEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/mouseEffect.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function MouseEffectProvider({ children }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Initialiser l'effet de déformation au survol de la souris
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mouseEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initMouseEffect"])();
        // Ajouter l'effet de suivi du pointeur pour les overlays
        const handleMouseMove = (e)=>{
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        };
        document.addEventListener('mousemove', handleMouseMove);
        return ()=>{
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)");
        } else {
            "TURBOPACK unreachable";
        }
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__003a3768._.js.map