import{a as c,j as t,c as d,r as a}from"./vendor-TXcX_tYA.js";import{F as l,T as u,a as f}from"./components-CqKZzJec.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const m=c(()=>t.jsxs("div",{className:"container",children:[t.jsx("h1",{children:"todos"}),t.jsx(l,{}),t.jsx(u,{}),t.jsx(f,{})]}));d(document.getElementById("root")).render(t.jsx(a.StrictMode,{children:t.jsx(m,{})}));