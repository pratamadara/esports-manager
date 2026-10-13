import { c as createLucideIcon, j as jsxRuntimeExports, e as cn } from "./index-jTlOkBZI.js";
import { I as Input } from "./input-DlJjTPCB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function SearchInput({
  value,
  onChange,
  placeholder = "Cari…",
  className,
  id = "search-input"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Search,
      {
        className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id,
        "data-ocid": "search_input",
        type: "search",
        value,
        onChange: (event) => onChange(event.target.value),
        placeholder,
        className: "pl-9"
      }
    )
  ] });
}
export {
  SearchInput as S,
  Search as a
};
