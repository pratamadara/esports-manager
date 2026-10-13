import { c as createLucideIcon, q as useAuth, r as reactExports, j as jsxRuntimeExports, B as Button, d as ue, t as LogIn } from "./index-jTlOkBZI.js";
import { P as PageHeader } from "./PageHeader-CIKRaHnN.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent } from "./card-Qdusxlrz.js";
import { I as Input } from "./input-DlJjTPCB.js";
import { L as Label, S as ShieldAlert } from "./label-RHsanIlH.js";
import { S as Skeleton } from "./skeleton-gNCiuuGS.js";
import { v as useProfile, w as useSaveProfile } from "./api-CChFdPeg.js";
import { P as Pencil } from "./pencil-FWSS-N4A.js";
import { C as Check } from "./check-CueTr-9O.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
];
const UserRound = createLucideIcon("user-round", __iconNode);
function ProfileSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "profile.loading_state",
      className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-lg shadow-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-64" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-32" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-lg shadow-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-24" })
          ] })
        ] })
      ]
    }
  );
}
function SignInPrompt() {
  const { login, isInitializing, isLoggingIn } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      "data-ocid": "profile.signin_prompt",
      className: "mx-auto max-w-lg rounded-lg shadow-none",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "items-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-6 w-6 text-primary", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-xl", children: "Masuk untuk melihat profil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Profil Anda tersimpan dengan aman di Internet Identity. Masuk untuk mengatur nama tampilan dan melihat principal Anda." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "profile.login_button",
            onClick: login,
            disabled: isInitializing || isLoggingIn,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4", "aria-hidden": "true" }),
              isInitializing ? "Memuat…" : isLoggingIn ? "Masuk…" : "Masuk"
            ]
          }
        ) })
      ]
    }
  );
}
function PrincipalField({ principal }) {
  const [copied, setCopied] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2e3);
    return () => window.clearTimeout(timer);
  }, [copied]);
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(principal);
      setCopied(true);
      ue.success("Principal disalin ke papan klip");
    } catch {
      ue.error("Gagal menyalin principal");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "principal", children: "Principal Anda" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "principal",
          "data-ocid": "profile.principal_input",
          readOnly: true,
          value: principal,
          onFocus: (event) => event.currentTarget.select(),
          className: "font-mono text-xs"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "icon",
          "data-ocid": "profile.copy_principal_button",
          "aria-label": "Salin principal",
          onClick: handleCopy,
          children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-success", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4", "aria-hidden": "true" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Bagikan principal ini agar admin dapat memberikan peran kepada Anda." })
  ] });
}
function Profile() {
  var _a;
  const { isAuthenticated, isInitializing, principal } = useAuth();
  const profileQuery = useProfile();
  const saveProfile = useSaveProfile();
  const [displayName, setDisplayName] = reactExports.useState("");
  const [initialized, setInitialized] = reactExports.useState(false);
  const savedName = ((_a = profileQuery.data) == null ? void 0 : _a.displayName) ?? "";
  const hasName = savedName.trim() !== "";
  reactExports.useEffect(() => {
    if (initialized || !profileQuery.isSuccess) return;
    setDisplayName(savedName);
    setInitialized(true);
  }, [initialized, profileQuery.isSuccess, savedName]);
  const trimmed = displayName.trim();
  const isDirty = trimmed !== savedName.trim();
  const canSubmit = trimmed !== "" && isDirty && !saveProfile.isPending;
  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;
    saveProfile.mutate(
      { displayName: trimmed },
      {
        onSuccess: () => {
          ue.success("Nama tampilan diperbarui");
        },
        onError: () => {
          ue.error("Gagal menyimpan nama tampilan");
        }
      }
    );
  }
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageHeader,
        {
          eyebrow: "Akun",
          title: "Profil",
          description: "Kelola profil pengguna Anda."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSkeleton, {}) })
    ] });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageHeader,
        {
          eyebrow: "Akun",
          title: "Profil",
          description: "Kelola profil pengguna Anda."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignInPrompt, {}) })
    ] });
  }
  const principalText = principal ? principal.toText() : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "Akun",
        title: "Profil",
        description: "Kelola nama tampilan dan identitas Anda di ArenaID."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: profileQuery.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSkeleton, {}) : profileQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        "data-ocid": "profile.error_state",
        className: "rounded-lg shadow-none",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: "Gagal memuat profil" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Terjadi kesalahan saat mengambil profil Anda. Coba muat ulang halaman ini." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              "data-ocid": "profile.retry_button",
              onClick: () => void profileQuery.refetch(),
              children: "Coba lagi"
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        !hasName ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            "data-ocid": "profile.first_login_prompt",
            className: "rounded-lg border-primary/40 bg-primary/5 shadow-none",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                UserRound,
                {
                  className: "h-5 w-5 text-primary",
                  "aria-hidden": "true"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Selamat datang! Atur nama tampilan Anda" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Ini pertama kali Anda masuk. Masukkan nama tampilan agar Anda dikenali di seluruh ArenaID." })
            ] })
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-lg shadow-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Nama tampilan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Nama ini tampil pada aktivitas dan catatan Anda." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "displayName", children: "Nama tampilan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "displayName",
                  "data-ocid": "profile.display_name_input",
                  value: displayName,
                  onChange: (event) => setDisplayName(event.target.value),
                  placeholder: "Contoh: Rian Cast",
                  autoComplete: "nickname",
                  maxLength: 60,
                  "aria-invalid": trimmed === ""
                }
              ),
              trimmed === "" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  "data-ocid": "profile.display_name_error",
                  className: "text-xs text-destructive",
                  children: "Nama tampilan tidak boleh kosong."
                }
              ) : null
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                "data-ocid": "profile.save_button",
                disabled: !canSubmit,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4", "aria-hidden": "true" }),
                  saveProfile.isPending ? "Menyimpan…" : hasName ? "Simpan perubahan" : "Simpan nama"
                ]
              }
            )
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "h-fit rounded-lg shadow-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Identitas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Principal Internet Identity Anda." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: principalText ? /* @__PURE__ */ jsxRuntimeExports.jsx(PrincipalField, { principal: principalText }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Principal belum tersedia." }) })
      ] })
    ] }) })
  ] });
}
export {
  Profile as default
};
