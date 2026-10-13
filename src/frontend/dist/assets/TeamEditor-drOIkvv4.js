import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as cn, b as useParams, a as useNavigate, q as useAuth, B as Button, L as Link, I as ExternalBlob, d as ue } from "./index-jTlOkBZI.js";
import { E as EmptyState, a as formatNumber } from "./format-D6UPf0rn.js";
import { P as PageHeader } from "./PageHeader-CIKRaHnN.js";
import { T as Trash2, A as AlertDialog, h as AlertDialogTrigger, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-B3GSIhZT.js";
import { C as Card } from "./card-Qdusxlrz.js";
import { I as Input } from "./input-DlJjTPCB.js";
import { P as Primitive, L as Label, S as ShieldAlert } from "./label-RHsanIlH.js";
import { S as Skeleton } from "./skeleton-gNCiuuGS.js";
import { d as useTeam, u as useTournaments, r as useCreateTeam, s as useUpdateTeam, l as useDeleteTeam, t as useSetRoster, p as useAddTeamToTournament, q as useRemoveTeamFromTournament } from "./api-CChFdPeg.js";
import { U as Users } from "./users-BBJwGzXS.js";
import { G as Gamepad2 } from "./gamepad-2-B43dl_oV.js";
import { T as Trophy } from "./trophy-DD0fy1fH.js";
import { S as Save } from "./save-Dr972GFA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const CREATE_SENTINEL = "baru";
function nextPlayerId(roster) {
  let max = 0n;
  for (const player of roster) {
    if (player.id > max) max = player.id;
  }
  return max + 1n;
}
function AdminGate() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    EmptyState,
    {
      icon: ShieldAlert,
      title: "Akses khusus admin",
      description: "Halaman ini hanya dapat diakses oleh administrator. Masuk dengan akun admin untuk mengelola tim.",
      action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tim", children: "Kembali ke daftar tim" }) })
    }
  ) });
}
function EditorSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "loading_state", className: "container py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-3 h-4 w-96" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 rounded-lg" })
    ] })
  ] });
}
function TeamEditor() {
  const { id } = useParams({ from: "/kelola/tim/$id" });
  const navigate = useNavigate();
  const { isAdmin, isAdminLoading } = useAuth();
  const isCreate = id === CREATE_SENTINEL;
  const teamId = isCreate ? null : BigInt(id);
  const { data: team, isLoading: teamLoading } = useTeam(teamId ?? 0n);
  const { data: tournaments } = useTournaments();
  const createTeam = useCreateTeam();
  const updateTeam = useUpdateTeam();
  const deleteTeam = useDeleteTeam();
  const setRosterMutation = useSetRoster();
  const addTeamToTournament = useAddTeamToTournament();
  const removeTeamFromTournament = useRemoveTeamFromTournament();
  const [name, setName] = reactExports.useState("");
  const [game, setGame] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [logoUrl, setLogoUrl] = reactExports.useState("");
  const [roster, setRoster] = reactExports.useState([]);
  const [tournamentIds, setTournamentIds] = reactExports.useState([]);
  const [uploadProgress, setUploadProgress] = reactExports.useState(null);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const [initialized, setInitialized] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (isCreate || !team || initialized) return;
    setName(team.name);
    setGame(team.game);
    setDescription(team.description);
    setLogoUrl(team.logoUrl);
    setRoster(
      team.roster.map((player) => ({
        id: player.id,
        name: player.name,
        role: player.role
      }))
    );
    setTournamentIds(team.tournamentIds);
    setInitialized(true);
  }, [isCreate, team, initialized]);
  const isSaving = createTeam.isPending || updateTeam.isPending || setRosterMutation.isPending;
  const sortedTournaments = reactExports.useMemo(
    () => [...tournaments ?? []].sort(
      (a, b) => a.name.localeCompare(b.name, "id")
    ),
    [tournaments]
  );
  async function handleLogoChange(file) {
    setIsUploading(true);
    setUploadProgress(0);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(
        bytes,
        file.type,
        file.name
      ).withUploadProgress((pct) => setUploadProgress(pct));
      setLogoUrl(blob.getDirectURL());
      setUploadProgress(100);
      ue.success("Logo berhasil diunggah");
    } catch {
      setUploadProgress(null);
      ue.error("Gagal mengunggah logo. Coba lagi.");
    } finally {
      setIsUploading(false);
    }
  }
  function handleAddPlayer() {
    setRoster((current) => [
      ...current,
      { id: nextPlayerId(current), name: "", role: "" }
    ]);
  }
  function handleUpdatePlayer(playerId, field, value) {
    setRoster(
      (current) => current.map(
        (player) => player.id === playerId ? { ...player, [field]: value } : player
      )
    );
  }
  function handleRemovePlayer(playerId) {
    setRoster((current) => current.filter((player) => player.id !== playerId));
  }
  function handleToggleTournament(tournamentTeamId) {
    if (teamId === null) return;
    const isMember = tournamentIds.includes(tournamentTeamId);
    const mutation = isMember ? removeTeamFromTournament : addTeamToTournament;
    mutation.mutate(
      { id: tournamentTeamId, teamId },
      {
        onSuccess: () => {
          setTournamentIds(
            (current) => isMember ? current.filter((item) => item !== tournamentTeamId) : [...current, tournamentTeamId]
          );
          ue.success(
            isMember ? "Tim dikeluarkan dari turnamen" : "Tim ditambahkan ke turnamen"
          );
        },
        onError: () => {
          ue.error("Gagal memperbarui keikutsertaan turnamen");
        }
      }
    );
  }
  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedGame = game.trim();
    if (trimmedName === "" || trimmedGame === "") {
      ue.error("Nama dan game tim wajib diisi");
      return;
    }
    const input = {
      name: trimmedName,
      game: trimmedGame,
      description: description.trim(),
      logoUrl
    };
    if (isCreate) {
      createTeam.mutate(input, {
        onSuccess: (createdTeam) => {
          const cleanedRoster = roster.filter((player) => player.name.trim() !== "").map((player) => ({
            id: player.id,
            name: player.name.trim(),
            role: player.role.trim()
          }));
          if (cleanedRoster.length === 0) {
            ue.success("Tim berhasil dibuat");
            void navigate({ to: "/kelola" });
            return;
          }
          setRosterMutation.mutate(
            { id: createdTeam.id, roster: cleanedRoster },
            {
              onSuccess: () => {
                ue.success("Tim berhasil dibuat");
                void navigate({ to: "/kelola" });
              },
              onError: () => {
                ue.error("Tim tersimpan, tetapi roster gagal disimpan");
                void navigate({
                  to: `/kelola/tim/${createdTeam.id.toString()}`
                });
              }
            }
          );
        },
        onError: () => {
          ue.error("Gagal membuat tim");
        }
      });
      return;
    }
    if (teamId === null) return;
    updateTeam.mutate(
      { id: teamId, input },
      {
        onSuccess: () => {
          const cleanedRoster = roster.filter((player) => player.name.trim() !== "").map((player) => ({
            id: player.id,
            name: player.name.trim(),
            role: player.role.trim()
          }));
          setRosterMutation.mutate(
            { id: teamId, roster: cleanedRoster },
            {
              onSuccess: () => {
                ue.success("Tim berhasil diperbarui");
                void navigate({ to: "/kelola" });
              },
              onError: () => {
                ue.error("Data tim tersimpan, tetapi roster gagal disimpan");
              }
            }
          );
        },
        onError: () => {
          ue.error("Gagal memperbarui tim");
        }
      }
    );
  }
  function handleDelete() {
    if (teamId === null) return;
    deleteTeam.mutate(teamId, {
      onSuccess: () => {
        ue.success("Tim berhasil dihapus");
        void navigate({ to: "/kelola" });
      },
      onError: () => {
        ue.error("Gagal menghapus tim");
      }
    });
  }
  if (isAdminLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EditorSkeleton, {});
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminGate, {});
  }
  if (!isCreate && teamLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EditorSkeleton, {});
  }
  if (!isCreate && !team) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Users,
        title: "Tim tidak ditemukan",
        description: "Tim yang Anda cari mungkin telah dihapus atau tautannya tidak valid.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/kelola", children: "Kembali ke panel kelola" }) })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "sm",
        asChild: true,
        className: "mb-4 -ml-2",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/kelola", "data-ocid": "team_editor.back_button", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4", "aria-hidden": "true" }),
          "Kembali ke Kelola"
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "Panel Admin",
        title: isCreate ? "Tim Baru" : `Ubah ${(team == null ? void 0 : team.name) ?? "Tim"}`,
        description: isCreate ? "Lengkapi data tim, unggah logo, dan atur roster pemain." : "Perbarui data tim, logo, roster pemain, dan keikutsertaan turnamen."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        "data-ocid": "team_editor.form",
        className: "mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gap-5 rounded-lg border border-border bg-card p-6 shadow-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "h-4 w-4 text-primary", "aria-hidden": "true" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground", children: "Informasi Tim" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "team-name", children: "Nama Tim" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "team-name",
                      "data-ocid": "team_editor.name_input",
                      value: name,
                      onChange: (event) => setName(event.target.value),
                      placeholder: "Contoh: Garuda Prime",
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "team-game", children: "Game" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "team-game",
                      "data-ocid": "team_editor.game_input",
                      value: game,
                      onChange: (event) => setGame(event.target.value),
                      placeholder: "Contoh: Mobile Legends",
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "team-description", children: "Deskripsi" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "team-description",
                      "data-ocid": "team_editor.description_textarea",
                      value: description,
                      onChange: (event) => setDescription(event.target.value),
                      placeholder: "Ceritakan tentang tim ini…",
                      rows: 4
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gap-5 rounded-lg border border-border bg-card p-6 shadow-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-primary", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground", children: "Roster Pemain" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    "data-ocid": "team_editor.add_player_button",
                    onClick: handleAddPlayer,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4", "aria-hidden": "true" }),
                      "Tambah Pemain"
                    ]
                  }
                )
              ] }),
              roster.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md border border-dashed border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground", children: "Belum ada pemain. Tambahkan pemain beserta perannya." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-3", children: roster.map((player, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  "data-ocid": `team_editor.player.${index + 1}`,
                  className: "flex flex-col gap-3 rounded-md border border-border bg-background/40 p-3 sm:flex-row sm:items-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        "data-ocid": `team_editor.player_name_input.${index + 1}`,
                        value: player.name,
                        onChange: (event) => handleUpdatePlayer(
                          player.id,
                          "name",
                          event.target.value
                        ),
                        placeholder: "Nama pemain",
                        "aria-label": `Nama pemain ${index + 1}`,
                        className: "sm:flex-1"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        "data-ocid": `team_editor.player_role_input.${index + 1}`,
                        value: player.role,
                        onChange: (event) => handleUpdatePlayer(
                          player.id,
                          "role",
                          event.target.value
                        ),
                        placeholder: "Peran (mis. Jungler)",
                        "aria-label": `Peran pemain ${index + 1}`,
                        className: "sm:w-48"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        "data-ocid": `team_editor.remove_player_button.${index + 1}`,
                        "aria-label": `Hapus pemain ${index + 1}`,
                        onClick: () => handleRemovePlayer(player.id),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4", "aria-hidden": "true" })
                      }
                    )
                  ]
                },
                player.id.toString()
              )) }),
              isCreate ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Roster akan tersimpan otomatis setelah tim dibuat." }) : null
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gap-5 rounded-lg border border-border bg-card p-6 shadow-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-4 w-4 text-primary", "aria-hidden": "true" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground", children: "Logo Tim" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                logoUrl.trim() !== "" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: logoUrl,
                    alt: "Pratinjau logo tim",
                    className: "h-16 w-16 shrink-0 rounded-md border border-border bg-muted object-cover"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "aria-hidden": "true",
                    className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-dashed border-border bg-muted text-muted-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-6 w-6" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      ref: fileInputRef,
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      onChange: (event) => {
                        var _a;
                        const file = (_a = event.target.files) == null ? void 0 : _a[0];
                        if (file) void handleLogoChange(file);
                        event.target.value = "";
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      "data-ocid": "team_editor.upload_button",
                      disabled: isUploading,
                      onClick: () => {
                        var _a;
                        return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                      },
                      children: [
                        isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          LoaderCircle,
                          {
                            className: "h-4 w-4 animate-spin",
                            "aria-hidden": "true"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-4 w-4", "aria-hidden": "true" }),
                        isUploading ? "Mengunggah…" : "Pilih Logo"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Format PNG, JPG, atau WEBP." })
                ] })
              ] }),
              uploadProgress !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "team_editor.upload_progress", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: uploadProgress }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 font-mono text-xs text-muted-foreground", children: [
                  formatNumber(uploadProgress),
                  "%"
                ] })
              ] }) : null
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gap-5 rounded-lg border border-border bg-card p-6 shadow-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-primary", "aria-hidden": "true" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground", children: "Turnamen yang Diikuti" })
              ] }),
              isCreate ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md border border-dashed border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground", children: "Simpan tim terlebih dahulu untuk mengatur keikutsertaan turnamen." }) : sortedTournaments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md border border-dashed border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground", children: "Belum ada turnamen yang tersedia." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2", children: sortedTournaments.map((tournament, index) => {
                const isMember = tournamentIds.includes(tournament.id);
                return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: isMember ? "default" : "outline",
                    size: "sm",
                    "data-ocid": `team_editor.tournament_toggle.${index + 1}`,
                    "aria-pressed": isMember,
                    className: "h-auto w-full justify-start whitespace-normal py-2.5 text-left",
                    onClick: () => handleToggleTournament(tournament.id),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col items-start gap-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: tournament.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] uppercase tracking-wider opacity-70", children: tournament.game })
                    ] })
                  }
                ) }, tournament.id.toString());
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  "data-ocid": "team_editor.submit_button",
                  disabled: isSaving,
                  children: [
                    isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4", "aria-hidden": "true" }),
                    isCreate ? "Simpan Tim" : "Perbarui Tim"
                  ]
                }
              ),
              !isCreate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "destructive",
                    "data-ocid": "team_editor.delete_button",
                    disabled: deleteTeam.isPending,
                    children: [
                      deleteTeam.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        LoaderCircle,
                        {
                          className: "h-4 w-4 animate-spin",
                          "aria-hidden": "true"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4", "aria-hidden": "true" }),
                      "Hapus Tim"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "team_editor.delete_dialog", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display", children: "Hapus tim ini?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Tindakan ini permanen. Tim beserta rosternya akan dihapus dan tidak dapat dikembalikan." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "team_editor.cancel_button", children: "Batal" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AlertDialogAction,
                      {
                        "data-ocid": "team_editor.confirm_button",
                        onClick: handleDelete,
                        children: "Hapus"
                      }
                    )
                  ] })
                ] })
              ] }) : null
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  TeamEditor as default
};
