import { j as jsxRuntimeExports, e as cn } from "./index-jTlOkBZI.js";
function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      "data-ocid": "page_header",
      className: cn(
        "flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          eyebrow ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary", children: eyebrow }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl", children: title }),
          description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm text-muted-foreground", children: description }) : null
        ] }),
        actions ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 items-center gap-2", children: actions }) : null
      ]
    }
  );
}
export {
  PageHeader as P
};
