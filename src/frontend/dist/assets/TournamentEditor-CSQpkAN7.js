import { c as createLucideIcon, b as useParams, a as useNavigate, q as useAuth, r as reactExports, T as TournamentStatus, j as jsxRuntimeExports, B as Button, X, e as cn, d as ue } from "./index-jTlOkBZI.js";
import { E as EmptyState, t as tournamentStatusLabels, d as formatDateTime } from "./format-D6UPf0rn.js";
import { P as PageHeader } from "./PageHeader-CIKRaHnN.js";
import { S as StatusBadge } from "./StatusBadge-CP8sgRJd.js";
import { A as AlertDialog, h as AlertDialogTrigger, T as Trash2, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-B3GSIhZT.js";
import { I as Input } from "./input-DlJjTPCB.js";
import { S as ShieldAlert, L as Label } from "./label-RHsanIlH.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BydKGdbU.js";
import { S as Skeleton } from "./skeleton-gNCiuuGS.js";
import { b as useTournament, a as useTeams, n as useCreateTournament, o as useUpdateTournament, k as useDeleteTournament, p as useAddTeamToTournament, q as useRemoveTeamFromTournament } from "./api-CChFdPeg.js";
import { C as CalendarClock } from "./calendar-clock-B1_9Ne1v.js";
import { P as Plus } from "./plus-QJxjI9XC.js";
import { U as Users } from "./users-BBJwGzXS.js";
import { S as Save } from "./save-Dr972GFA.js";
import "./check-CueTr-9O.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    { d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8", key: "mg9rjx" }
  ]
];
const Bold = createLucideIcon("bold", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "19", x2: "10", y1: "4", y2: "4", key: "15jd3p" }],
  ["line", { x1: "14", x2: "5", y1: "20", y2: "20", key: "bu0au3" }],
  ["line", { x1: "15", x2: "9", y1: "4", y2: "20", key: "uljnxc" }]
];
const Italic = createLucideIcon("italic", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
];
const List = createLucideIcon("list", __iconNode);
const CREATE_SENTINEL = "baru";
const emptyForm = {
  name: "",
  game: "",
  format: "",
  prizePool: "",
  status: TournamentStatus.akanDatang,
  description: "",
  schedule: []
};
function timestampToLocalInput(timestamp) {
  if (timestamp === void 0) return "";
  const date = new Date(Number(timestamp / 1000000n));
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
function localInputToTimestamp(value) {
  const ms = new Date(value).getTime();
  if (Number.isNaN(ms)) return 0n;
  return BigInt(ms) * 1000000n;
}
function scheduleToDrafts(schedule) {
  return schedule.map((entry) => ({
    key: entry.id.toString(),
    caption: entry.caption,
    startAt: timestampToLocalInput(entry.startAt),
    endAt: timestampToLocalInput(entry.endAt)
  }));
}
function draftsToSchedule(drafts) {
  return drafts.filter((draft) => draft.caption.trim() !== "").map((draft, index) => ({
    id: BigInt(index + 1),
    caption: draft.caption.trim(),
    startAt: localInputToTimestamp(draft.startAt),
    endAt: localInputToTimestamp(draft.endAt)
  }));
}
function RichTextEditor({
  value,
  onChange
}) {
  const editorRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const node = editorRef.current;
    if (node && node.innerHTML !== value) {
      node.innerHTML = value;
    }
  }, [value]);
  const exec = reactExports.useCallback(
    (command) => {
      var _a;
      (_a = editorRef.current) == null ? void 0 : _a.focus();
      document.execCommand(command);
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-md border border-input bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 border-b border-border bg-muted/50 p-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          "data-ocid": "tournament.editor.bold_button",
          "aria-label": "Tebalkan teks",
          onClick: () => exec("bold"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, { className: "h-4 w-4", "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          "data-ocid": "tournament.editor.italic_button",
          "aria-label": "Miringkan teks",
          onClick: () => exec("italic"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, { className: "h-4 w-4", "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          "data-ocid": "tournament.editor.list_button",
          "aria-label": "Buat daftar berpoin",
          onClick: () => exec("insertUnorderedList"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4", "aria-hidden": "true" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: editorRef,
        contentEditable: true,
        role: "textbox",
        tabIndex: 0,
        "aria-multiline": "true",
        "aria-label": "Deskripsi turnamen",
        "data-ocid": "tournament.editor",
        onInput: (event) => onChange(event.currentTarget.innerHTML),
        className: "min-h-[140px] px-3 py-2 text-sm text-foreground outline-none [&_ul]:list-disc [&_ul]:pl-5"
      }
    )
  ] });
}
function TournamentEditor() {
  const { id } = useParams({ from: "/kelola/turnamen/$id" });
  const navigate = useNavigate();
  const { isAdmin, isAdminLoading, isAuthenticated } = useAuth();
  const isCreate = id === CREATE_SENTINEL;
  const tournamentId = reactExports.useMemo(() => {
    if (isCreate) return null;
    try {
      return BigInt(id);
    } catch {
      return null;
    }
  }, [id, isCreate]);
  const tournamentQuery = useTournament(tournamentId ?? 0n);
  const teamsQuery = useTeams();
  const createTournament = useCreateTournament();
  const updateTournament = useUpdateTournament();
  const deleteTournament = useDeleteTournament();
  const addTeam = useAddTeamToTournament();
  const removeTeam = useRemoveTeamFromTournament();
  const [form, setForm] = reactExports.useState(emptyForm);
  const [initialized, setInitialized] = reactExports.useState(false);
  const tournament = tournamentQuery.data ?? null;
  reactExports.useEffect(() => {
    if (isCreate || initialized || !tournament) return;
    setForm({
      name: tournament.name,
      game: tournament.game,
      format: tournament.format,
      prizePool: tournament.prizePool,
      status: tournament.status,
      description: tournament.description,
      schedule: scheduleToDrafts(tournament.schedule)
    });
    setInitialized(true);
  }, [isCreate, initialized, tournament]);
  const isSaving = createTournament.isPending || updateTournament.isPending;
  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };
  const addScheduleEntry = () => {
    setForm((current) => ({
      ...current,
      schedule: [
        ...current.schedule,
        {
          key: `baru-${Date.now()}`,
          caption: "",
          startAt: "",
          endAt: ""
        }
      ]
    }));
  };
  const updateScheduleEntry = (key, patch) => {
    setForm((current) => ({
      ...current,
      schedule: current.schedule.map(
        (entry) => entry.key === key ? { ...entry, ...patch } : entry
      )
    }));
  };
  const removeScheduleEntry = (key) => {
    setForm((current) => ({
      ...current,
      schedule: current.schedule.filter((entry) => entry.key !== key)
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.name.trim() === "") {
      ue.error("Nama turnamen wajib diisi.");
      return;
    }
    const input = {
      name: form.name.trim(),
      game: form.game.trim(),
      format: form.format.trim(),
      prizePool: form.prizePool.trim(),
      status: form.status,
      description: form.description,
      schedule: draftsToSchedule(form.schedule)
    };
    if (isCreate) {
      createTournament.mutate(input, {
        onSuccess: () => {
          ue.success("Turnamen berhasil dibuat.");
          void navigate({ to: "/kelola" });
        },
        onError: () => ue.error("Gagal membuat turnamen.")
      });
      return;
    }
    if (tournamentId === null) {
      ue.error("ID turnamen tidak valid.");
      return;
    }
    updateTournament.mutate(
      { id: tournamentId, input },
      {
        onSuccess: () => {
          ue.success("Perubahan turnamen disimpan.");
          void navigate({ to: "/kelola" });
        },
        onError: () => ue.error("Gagal menyimpan turnamen.")
      }
    );
  };
  const handleDelete = () => {
    if (tournamentId === null) return;
    deleteTournament.mutate(tournamentId, {
      onSuccess: () => {
        ue.success("Turnamen dihapus.");
        void navigate({ to: "/kelola" });
      },
      onError: () => ue.error("Gagal menghapus turnamen.")
    });
  };
  const handleToggleTeam = (teamId, isMember) => {
    if (tournamentId === null) {
      ue.error("Simpan turnamen terlebih dahulu untuk mengelola tim.");
      return;
    }
    if (isMember) {
      removeTeam.mutate(
        { id: tournamentId, teamId },
        {
          onSuccess: () => ue.success("Tim dikeluarkan dari turnamen."),
          onError: () => ue.error("Gagal mengeluarkan tim.")
        }
      );
      return;
    }
    addTeam.mutate(
      { id: tournamentId, teamId },
      {
        onSuccess: () => ue.success("Tim ditambahkan ke turnamen."),
        onError: () => ue.error("Gagal menambahkan tim.")
      }
    );
  };
  if (!isAuthenticated || !isAdminLoading && !isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageHeader,
        {
          eyebrow: "Panel Admin",
          title: "Akses Terbatas",
          description: "Halaman ini hanya dapat diakses oleh administrator."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: ShieldAlert,
          title: "Anda bukan administrator",
          description: "Masuk dengan akun administrator untuk mengelola turnamen.",
          action: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              "data-ocid": "tournament.editor.back_button",
              onClick: () => void navigate({ to: "/kelola" }),
              children: "Kembali ke Panel"
            }
          )
        }
      ) })
    ] });
  }
  if (isAdminLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", "data-ocid": "loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-6 h-96 w-full" })
    ] });
  }
  if (!isCreate && tournamentQuery.isPending) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", "data-ocid": "loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-6 h-96 w-full" })
    ] });
  }
  if (!isCreate && !tournament) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageHeader,
        {
          eyebrow: "Panel Admin",
          title: "Turnamen Tidak Ditemukan",
          description: "Turnamen yang Anda cari tidak tersedia."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: CalendarClock,
          title: "Turnamen tidak ditemukan",
          description: "Turnamen mungkin telah dihapus atau tautannya tidak valid.",
          action: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              "data-ocid": "tournament.editor.back_button",
              onClick: () => void navigate({ to: "/kelola" }),
              children: "Kembali ke Panel"
            }
          )
        }
      ) })
    ] });
  }
  const teams = teamsQuery.data ?? [];
  const memberIds = (tournament == null ? void 0 : tournament.teamIds) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "Panel Admin",
        title: isCreate ? "Turnamen Baru" : "Ubah Turnamen",
        description: isCreate ? "Lengkapi detail turnamen, jadwal, dan tim peserta." : "Perbarui detail turnamen, jadwal, dan tim peserta.",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            "data-ocid": "tournament.editor.cancel_button",
            onClick: () => void navigate({ to: "/kelola" }),
            children: "Batal"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        "data-ocid": "tournament.editor.form",
        className: "mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "section",
              {
                "data-ocid": "tournament.editor.detail_section",
                className: "rounded-lg border border-border bg-card p-5 shadow-subtle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Detail Turnamen" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:col-span-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tournament-name", children: "Nama Turnamen" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "tournament-name",
                          "data-ocid": "tournament.editor.name_input",
                          value: form.name,
                          onChange: (event) => updateField("name", event.target.value),
                          placeholder: "Contoh: ArenaID Mobile Legends Championship"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tournament-game", children: "Game" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "tournament-game",
                          "data-ocid": "tournament.editor.game_input",
                          value: form.game,
                          onChange: (event) => updateField("game", event.target.value),
                          placeholder: "Mobile Legends"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tournament-format", children: "Format" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "tournament-format",
                          "data-ocid": "tournament.editor.format_input",
                          value: form.format,
                          onChange: (event) => updateField("format", event.target.value),
                          placeholder: "Single Elimination, Bo3"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tournament-prize", children: "Hadiah" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "tournament-prize",
                          "data-ocid": "tournament.editor.prize_input",
                          value: form.prizePool,
                          onChange: (event) => updateField("prizePool", event.target.value),
                          placeholder: "Rp50.000.000"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tournament-status", children: "Status" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: form.status,
                          onValueChange: (value) => updateField("status", value),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                id: "tournament-status",
                                "data-ocid": "tournament.editor.status_select",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih status" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(TournamentStatus).map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status, children: tournamentStatusLabels[status] }, status)) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:col-span-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tournament-description", children: "Deskripsi" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        RichTextEditor,
                        {
                          value: form.description,
                          onChange: (html) => updateField("description", html)
                        }
                      )
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "section",
              {
                "data-ocid": "tournament.editor.schedule_section",
                className: "rounded-lg border border-border bg-card p-5 shadow-subtle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Jadwal Turnamen" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        "data-ocid": "tournament.editor.add_schedule_button",
                        onClick: addScheduleEntry,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4", "aria-hidden": "true" }),
                          "Tambah Jadwal"
                        ]
                      }
                    )
                  ] }),
                  form.schedule.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground", children: "Belum ada jadwal. Tambahkan sesi seperti pembukaan, kualifikasi, atau babak final." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 flex flex-col gap-3", children: form.schedule.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "li",
                    {
                      "data-ocid": `tournament.editor.schedule_item.${index + 1}`,
                      className: "rounded-md border border-border bg-background p-3",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:col-span-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `schedule-caption-${entry.key}`, children: "Keterangan" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: `schedule-caption-${entry.key}`,
                                "data-ocid": `tournament.editor.schedule_caption_input.${index + 1}`,
                                value: entry.caption,
                                onChange: (event) => updateScheduleEntry(entry.key, {
                                  caption: event.target.value
                                }),
                                placeholder: "Babak Penyisihan"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `schedule-start-${entry.key}`, children: "Mulai" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: `schedule-start-${entry.key}`,
                                type: "datetime-local",
                                "data-ocid": `tournament.editor.schedule_start_input.${index + 1}`,
                                value: entry.startAt,
                                onChange: (event) => updateScheduleEntry(entry.key, {
                                  startAt: event.target.value
                                })
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `schedule-end-${entry.key}`, children: "Selesai" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: `schedule-end-${entry.key}`,
                                type: "datetime-local",
                                "data-ocid": `tournament.editor.schedule_end_input.${index + 1}`,
                                value: entry.endAt,
                                onChange: (event) => updateScheduleEntry(entry.key, {
                                  endAt: event.target.value
                                })
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: entry.startAt ? formatDateTime(localInputToTimestamp(entry.startAt)) : "Jadwal belum ditentukan" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Button,
                            {
                              type: "button",
                              variant: "ghost",
                              size: "sm",
                              "data-ocid": `tournament.editor.remove_schedule_button.${index + 1}`,
                              onClick: () => removeScheduleEntry(entry.key),
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4", "aria-hidden": "true" }),
                                "Hapus"
                              ]
                            }
                          )
                        ] })
                      ]
                    },
                    entry.key
                  )) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "section",
              {
                "data-ocid": "tournament.editor.teams_section",
                className: "rounded-lg border border-border bg-card p-5 shadow-subtle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-primary", "aria-hidden": "true" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Tim Peserta" })
                  ] }),
                  isCreate ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground", children: "Simpan turnamen terlebih dahulu untuk memilih tim peserta." }) : teamsQuery.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-col gap-2", children: Array.from({ length: 4 }, (_, i) => `team-skeleton-${i}`).map(
                    (key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, key)
                  ) }) : teams.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground", children: "Belum ada tim terdaftar." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 flex flex-col gap-2", children: teams.map((team, index) => {
                    const isMember = memberIds.some(
                      (memberId) => memberId === team.id
                    );
                    return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `tournament.editor.team_toggle.${index + 1}`,
                        "aria-pressed": isMember,
                        onClick: () => handleToggleTeam(team.id, isMember),
                        className: cn(
                          "flex w-full items-center justify-between gap-3 rounded-md border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          isMember ? "border-primary/50 bg-primary/10" : "border-border bg-background hover:bg-muted"
                        ),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-sm font-medium text-foreground", children: team.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate font-mono text-xs text-muted-foreground", children: team.game })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: cn(
                                "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                                isMember ? "border-primary/50 bg-primary/15 text-primary" : "border-border bg-muted text-muted-foreground"
                              ),
                              children: isMember ? "Peserta" : "Tambah"
                            }
                          )
                        ]
                      }
                    ) }, team.id.toString());
                  }) })
                ]
              }
            ),
            !isCreate && tournament ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "section",
              {
                "data-ocid": "tournament.editor.meta_section",
                className: "rounded-lg border border-border bg-card p-5 shadow-subtle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Ringkasan" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tournament.status }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-4 flex flex-col gap-2 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Dibuat" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-mono text-xs text-foreground", children: formatDateTime(tournament.createdAt) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Diperbarui" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-mono text-xs text-foreground", children: formatDateTime(tournament.updatedAt) })
                    ] })
                  ] })
                ]
              }
            ) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  "data-ocid": "tournament.editor.save_button",
                  disabled: isSaving,
                  className: "w-full",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4", "aria-hidden": "true" }),
                    isSaving ? "Menyimpan…" : isCreate ? "Buat Turnamen" : "Simpan Perubahan"
                  ]
                }
              ),
              !isCreate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "destructive",
                    "data-ocid": "tournament.editor.delete_button",
                    className: "w-full",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4", "aria-hidden": "true" }),
                      "Hapus Turnamen"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "tournament.editor.delete_dialog", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Hapus turnamen ini?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Tindakan ini tidak dapat dibatalkan. Seluruh data turnamen akan dihapus permanen." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "tournament.editor.delete_cancel_button", children: "Batal" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AlertDialogAction,
                      {
                        "data-ocid": "tournament.editor.delete_confirm_button",
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
  TournamentEditor as default
};
