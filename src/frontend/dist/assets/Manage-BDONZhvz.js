import { j as jsxRuntimeExports, R as Root$1, C as Content$1, f as Close, X, e as cn, g as Title, D as Description, P as Portal, O as Overlay, r as reactExports, B as Button, M as MatchStatus, d as ue, h as useId, i as Primitive, k as composeEventHandlers, l as createContextScope, m as useComposedRefs, n as useControllableState, o as useCallbackRef, p as Presence, q as useAuth, a as useNavigate, t as LogIn, L as Link, T as TournamentStatus } from "./index-jTlOkBZI.js";
import { E as EmptyState, c as formatScore, d as formatDateTime, m as matchStatusLabel, b as formatDate, f as formatPrizePool, e as tournamentStatusLabel } from "./format-D6UPf0rn.js";
import { P as PageHeader } from "./PageHeader-CIKRaHnN.js";
import { I as Input } from "./input-DlJjTPCB.js";
import { L as Label, S as ShieldAlert } from "./label-RHsanIlH.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as createCollection, u as useDirection } from "./select-BydKGdbU.js";
import { S as Skeleton } from "./skeleton-gNCiuuGS.js";
import { u as useTournaments, c as useMatches, a as useTeams, e as useDeleteMatch, f as useSetMatchStatus, g as useSetMatchWinner, h as useCreateMatch, i as useUpdateMatch, j as useRecordScore, k as useDeleteTournament, l as useDeleteTeam, m as useSetTournamentStatus } from "./api-CChFdPeg.js";
import { P as Plus } from "./plus-QJxjI9XC.js";
import { T as Trophy } from "./trophy-DD0fy1fH.js";
import { C as CalendarClock } from "./calendar-clock-B1_9Ne1v.js";
import { P as Pencil } from "./pencil-FWSS-N4A.js";
import { T as Trash2, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-B3GSIhZT.js";
import { U as Users } from "./users-BBJwGzXS.js";
import "./check-CueTr-9O.js";
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content$1,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
const emptyDraft = {
  round: "",
  teamAId: "",
  teamBId: "",
  scheduledAt: ""
};
function toLocalInput(timestamp) {
  if (timestamp === void 0) return "";
  const date = new Date(Number(timestamp / 1000000n));
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 6e4;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}
function toTimestamp(value) {
  if (value === "") return void 0;
  const ms = new Date(value).getTime();
  if (Number.isNaN(ms)) return void 0;
  return BigInt(ms) * 1000000n;
}
function draftToInput(draft) {
  return {
    round: draft.round.trim(),
    teamAId: draft.teamAId === "" ? void 0 : BigInt(draft.teamAId),
    teamBId: draft.teamBId === "" ? void 0 : BigInt(draft.teamBId),
    scheduledAt: toTimestamp(draft.scheduledAt)
  };
}
function MatchDialog({
  tournamentId,
  match,
  open,
  onOpenChange
}) {
  var _a, _b;
  const { data: teams } = useTeams();
  const createMatch = useCreateMatch();
  const updateMatch = useUpdateMatch();
  const [draft, setDraft] = reactExports.useState(emptyDraft);
  const [initializedFor, setInitializedFor] = reactExports.useState(null);
  const matchKey = match ? match.id.toString() : "baru";
  if (open && initializedFor !== matchKey) {
    setInitializedFor(matchKey);
    setDraft(
      match ? {
        round: match.round,
        teamAId: ((_a = match.teamAId) == null ? void 0 : _a.toString()) ?? "",
        teamBId: ((_b = match.teamBId) == null ? void 0 : _b.toString()) ?? "",
        scheduledAt: toLocalInput(match.scheduledAt)
      } : emptyDraft
    );
  }
  const isPending = createMatch.isPending || updateMatch.isPending;
  const canSubmit = draft.round.trim() !== "" && !isPending;
  function handleSubmit() {
    if (!canSubmit) return;
    const input = draftToInput(draft);
    if (match) {
      updateMatch.mutate(
        { id: match.id, input, tournamentId },
        {
          onSuccess: () => {
            ue.success("Pertandingan diperbarui");
            onOpenChange(false);
          },
          onError: () => ue.error("Gagal memperbarui pertandingan")
        }
      );
    } else {
      createMatch.mutate(
        { tournamentId, input },
        {
          onSuccess: () => {
            ue.success("Pertandingan ditambahkan");
            onOpenChange(false);
          },
          onError: () => ue.error("Gagal menambahkan pertandingan")
        }
      );
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "match.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: match ? "Ubah Pertandingan" : "Pertandingan Baru" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Atur babak, tim, dan jadwal pertandingan." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "match-round", children: "Babak" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "match-round",
            "data-ocid": "match.round_input",
            value: draft.round,
            onChange: (event) => setDraft((current) => ({
              ...current,
              round: event.target.value
            })),
            placeholder: "Contoh: Semifinal"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "match-team-a", children: "Tim A" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: draft.teamAId,
              onValueChange: (value) => setDraft((current) => ({ ...current, teamAId: value })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "match-team-a",
                    "data-ocid": "match.team_a_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih tim" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (teams ?? []).map((team) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectItem,
                  {
                    value: team.id.toString(),
                    children: team.name
                  },
                  team.id.toString()
                )) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "match-team-b", children: "Tim B" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: draft.teamBId,
              onValueChange: (value) => setDraft((current) => ({ ...current, teamBId: value })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "match-team-b",
                    "data-ocid": "match.team_b_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih tim" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (teams ?? []).map((team) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectItem,
                  {
                    value: team.id.toString(),
                    children: team.name
                  },
                  team.id.toString()
                )) })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "match-schedule", children: "Jadwal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "match-schedule",
            type: "datetime-local",
            "data-ocid": "match.schedule_input",
            value: draft.scheduledAt,
            onChange: (event) => setDraft((current) => ({
              ...current,
              scheduledAt: event.target.value
            }))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          "data-ocid": "match.cancel_button",
          onClick: () => onOpenChange(false),
          children: "Batal"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          "data-ocid": "match.save_button",
          onClick: handleSubmit,
          disabled: !canSubmit,
          children: isPending ? "Menyimpan…" : "Simpan"
        }
      )
    ] })
  ] }) });
}
function ScoreDialog({
  tournamentId,
  match,
  open,
  onOpenChange
}) {
  var _a, _b;
  const recordScore = useRecordScore();
  const [scoreA, setScoreA] = reactExports.useState("");
  const [scoreB, setScoreB] = reactExports.useState("");
  const [initializedFor, setInitializedFor] = reactExports.useState(null);
  if (open && initializedFor !== match.id.toString()) {
    setInitializedFor(match.id.toString());
    setScoreA(((_a = match.scoreA) == null ? void 0 : _a.toString()) ?? "");
    setScoreB(((_b = match.scoreB) == null ? void 0 : _b.toString()) ?? "");
  }
  const canSubmit = scoreA.trim() !== "" && scoreB.trim() !== "" && !recordScore.isPending;
  function handleSubmit() {
    if (!canSubmit) return;
    recordScore.mutate(
      {
        id: match.id,
        scoreA: BigInt(scoreA),
        scoreB: BigInt(scoreB),
        tournamentId
      },
      {
        onSuccess: () => {
          ue.success("Skor dicatat");
          onOpenChange(false);
        },
        onError: () => ue.error("Gagal mencatat skor")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "score.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Catat Skor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
        match.round,
        " — masukkan skor akhir pertandingan."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "score-a", children: "Skor Tim A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "score-a",
            type: "number",
            min: 0,
            "data-ocid": "score.a_input",
            value: scoreA,
            onChange: (event) => setScoreA(event.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "score-b", children: "Skor Tim B" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "score-b",
            type: "number",
            min: 0,
            "data-ocid": "score.b_input",
            value: scoreB,
            onChange: (event) => setScoreB(event.target.value)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          "data-ocid": "score.cancel_button",
          onClick: () => onOpenChange(false),
          children: "Batal"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          "data-ocid": "score.save_button",
          onClick: handleSubmit,
          disabled: !canSubmit,
          children: recordScore.isPending ? "Menyimpan…" : "Simpan Skor"
        }
      )
    ] })
  ] }) });
}
function MatchesPanel() {
  const { data: tournaments, isPending: tournamentsPending } = useTournaments();
  const [tournamentId, setTournamentId] = reactExports.useState("");
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingMatch, setEditingMatch] = reactExports.useState(null);
  const [scoreMatch, setScoreMatch] = reactExports.useState(null);
  const selectedId = tournamentId === "" ? null : BigInt(tournamentId);
  const { data: matches, isPending: matchesPending } = useMatches(
    selectedId ?? 0n,
    { enabled: selectedId !== null }
  );
  const { data: teams } = useTeams();
  const deleteMatch = useDeleteMatch();
  const setMatchStatus = useSetMatchStatus();
  const setMatchWinner = useSetMatchWinner();
  const teamName = (id) => {
    var _a;
    if (id === void 0) return "Belum ditentukan";
    return ((_a = teams == null ? void 0 : teams.find((team) => team.id === id)) == null ? void 0 : _a.name) ?? "Tim dihapus";
  };
  const visibleMatches = selectedId === null ? [] : matches ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-sm gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "match-tournament", children: "Pilih Turnamen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: tournamentId, onValueChange: setTournamentId, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              id: "match-tournament",
              "data-ocid": "match.tournament_select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih turnamen" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (tournaments ?? []).map((tournament) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectItem,
            {
              value: tournament.id.toString(),
              children: tournament.name
            },
            tournament.id.toString()
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          "data-ocid": "match.open_modal_button",
          onClick: () => {
            setEditingMatch(null);
            setDialogOpen(true);
          },
          disabled: selectedId === null,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4", "aria-hidden": "true" }),
            "Pertandingan Baru"
          ]
        }
      )
    ] }),
    tournamentsPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { "data-ocid": "loading_state", className: "h-10 w-full" }) : null,
    selectedId === null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Trophy,
        title: "Belum ada turnamen dipilih",
        description: "Pilih turnamen terlebih dahulu untuk melihat dan mengelola pertandingannya."
      }
    ) : matchesPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "loading_state", className: "space-y-2", children: Array.from({ length: 4 }, (_, i) => `match-skeleton-${i}`).map(
      (id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, id)
    ) }) : visibleMatches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: CalendarClock,
        title: "Belum ada pertandingan",
        description: "Tambahkan pertandingan pertama untuk turnamen ini.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "match.empty_add_button",
            onClick: () => {
              setEditingMatch(null);
              setDialogOpen(true);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4", "aria-hidden": "true" }),
              "Pertandingan Baru"
            ]
          }
        )
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "match.table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Babak" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Pertandingan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Jadwal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: visibleMatches.map((match, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          "data-ocid": `match.row.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: match.round }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm", children: [
                teamName(match.teamAId),
                " ",
                formatScore(match.scoreA, match.scoreB),
                " ",
                teamName(match.teamBId)
              ] }),
              match.winnerId !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 inline-flex items-center gap-1 text-xs text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3 w-3", "aria-hidden": "true" }),
                teamName(match.winnerId)
              ] }) : null
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: formatDateTime(match.scheduledAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: match.status,
                onValueChange: (value) => setMatchStatus.mutate(
                  {
                    id: match.id,
                    status: value,
                    tournamentId: selectedId
                  },
                  {
                    onSuccess: () => ue.success("Status diperbarui"),
                    onError: () => ue.error("Gagal memperbarui status")
                  }
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "h-8 w-[150px]",
                      "data-ocid": `match.status_select.${index + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(MatchStatus).map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status, children: matchStatusLabel(status) }, status)) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  "data-ocid": `match.score_button.${index + 1}`,
                  "aria-label": `Catat skor ${match.round}`,
                  onClick: () => setScoreMatch(match),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4", "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  "data-ocid": `match.edit_button.${index + 1}`,
                  "aria-label": `Ubah ${match.round}`,
                  onClick: () => {
                    setEditingMatch(match);
                    setDialogOpen(true);
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4", "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  "data-ocid": `match.delete_button.${index + 1}`,
                  "aria-label": `Hapus ${match.round}`,
                  onClick: () => deleteMatch.mutate(
                    { id: match.id, tournamentId: selectedId },
                    {
                      onSuccess: () => ue.success("Pertandingan dihapus"),
                      onError: () => ue.error("Gagal menghapus")
                    }
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4", "aria-hidden": "true" })
                }
              )
            ] }) })
          ]
        },
        match.id.toString()
      )) })
    ] }) }),
    selectedId !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      MatchDialog,
      {
        tournamentId: selectedId,
        match: editingMatch,
        open: dialogOpen,
        onOpenChange: setDialogOpen
      }
    ) : null,
    selectedId !== null && scoreMatch ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScoreDialog,
      {
        tournamentId: selectedId,
        match: scoreMatch,
        open: scoreMatch !== null,
        onOpenChange: (open) => {
          if (!open) setScoreMatch(null);
        }
      }
    ) : null,
    selectedId !== null && visibleMatches.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground", children: "Tandai Pemenang" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: visibleMatches.filter((match) => match.teamAId !== void 0).map((match, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              match.round,
              ":"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                "data-ocid": `match.winner_a_button.${index + 1}`,
                onClick: () => setMatchWinner.mutate(
                  {
                    id: match.id,
                    winnerId: match.teamAId,
                    tournamentId: selectedId
                  },
                  {
                    onSuccess: () => ue.success("Pemenang ditandai"),
                    onError: () => ue.error("Gagal menandai pemenang")
                  }
                ),
                children: teamName(match.teamAId)
              }
            ),
            match.teamBId !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                "data-ocid": `match.winner_b_button.${index + 1}`,
                onClick: () => setMatchWinner.mutate(
                  {
                    id: match.id,
                    winnerId: match.teamBId,
                    tournamentId: selectedId
                  },
                  {
                    onSuccess: () => ue.success("Pemenang ditandai"),
                    onError: () => ue.error("Gagal menandai pemenang")
                  }
                ),
                children: teamName(match.teamBId)
              }
            ) : null
          ]
        },
        match.id.toString()
      )) })
    ] }) : null
  ] });
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function Manage() {
  const { isAuthenticated, isInitializing, isAdmin, isAdminLoading, login } = useAuth();
  const navigate = useNavigate();
  const { data: tournaments, isPending: tournamentsPending } = useTournaments();
  const { data: teams, isPending: teamsPending } = useTeams();
  const deleteTournament = useDeleteTournament();
  const deleteTeam = useDeleteTeam();
  const setTournamentStatus = useSetTournamentStatus();
  const [pendingDelete, setPendingDelete] = reactExports.useState(null);
  if (isInitializing || isAuthenticated && isAdminLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { "data-ocid": "loading_state", className: "h-10 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-4 h-4 w-96" })
    ] });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: LogIn,
        title: "Masuk untuk mengakses panel admin",
        description: "Halaman kelola hanya tersedia untuk pengguna yang sudah masuk dengan Internet Identity.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "manage.login_button",
            onClick: login,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4", "aria-hidden": "true" }),
              "Masuk"
            ]
          }
        )
      }
    ) });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: ShieldAlert,
        title: "Hanya admin",
        description: "Akun Anda tidak memiliki akses admin. Hubungi administrator untuk mendapatkan izin.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", "data-ocid": "manage.back_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/turnamen", children: "Lihat Turnamen" }) })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container space-y-8 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "Panel Admin",
        title: "Kelola",
        description: "Kelola turnamen, tim, dan pertandingan dari satu pusat komando."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "turnamen", "data-ocid": "manage.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-auto flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "turnamen", "data-ocid": "manage.turnamen_tab", children: "Turnamen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "tim", "data-ocid": "manage.tim_tab", children: "Tim" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "pertandingan", "data-ocid": "manage.pertandingan_tab", children: "Pertandingan" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "turnamen", className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Daftar Turnamen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "tournament.create_button",
              onClick: () => navigate({ to: "/kelola/turnamen/$id", params: { id: "baru" } }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4", "aria-hidden": "true" }),
                "Turnamen Baru"
              ]
            }
          )
        ] }),
        tournamentsPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "loading_state", className: "space-y-2", children: Array.from(
          { length: 4 },
          (_, i) => `tournament-skeleton-${i}`
        ).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, id)) }) : (tournaments ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: Trophy,
            title: "Belum ada turnamen",
            description: "Buat turnamen pertama untuk mulai mengelola kompetisi.",
            action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                "data-ocid": "tournament.empty_add_button",
                onClick: () => navigate({
                  to: "/kelola/turnamen/$id",
                  params: { id: "baru" }
                }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4", "aria-hidden": "true" }),
                  "Turnamen Baru"
                ]
              }
            )
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "tournament.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nama" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Game" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Jadwal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Hadiah" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Aksi" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: (tournaments ?? []).map((tournament, index) => {
            var _a;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TableRow,
              {
                "data-ocid": `tournament.row.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: tournament.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: tournament.game }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: formatDate((_a = tournament.schedule[0]) == null ? void 0 : _a.startAt) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: formatPrizePool(tournament.prizePool) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: tournament.status,
                      onValueChange: (value) => setTournamentStatus.mutate(
                        {
                          id: tournament.id,
                          status: value
                        },
                        {
                          onSuccess: () => ue.success("Status turnamen diperbarui"),
                          onError: () => ue.error("Gagal memperbarui status")
                        }
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "h-8 w-[150px]",
                            "data-ocid": `tournament.status_select.${index + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(TournamentStatus).map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status, children: tournamentStatusLabel(status) }, status)) })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        "data-ocid": `tournament.edit_button.${index + 1}`,
                        "aria-label": `Ubah ${tournament.name}`,
                        onClick: () => navigate({
                          to: "/kelola/turnamen/$id",
                          params: { id: tournament.id.toString() }
                        }),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4", "aria-hidden": "true" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        "data-ocid": `tournament.delete_button.${index + 1}`,
                        "aria-label": `Hapus ${tournament.name}`,
                        onClick: () => setPendingDelete({
                          kind: "turnamen",
                          id: tournament.id,
                          name: tournament.name
                        }),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4", "aria-hidden": "true" })
                      }
                    )
                  ] }) })
                ]
              },
              tournament.id.toString()
            );
          }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "tim", className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Daftar Tim" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "team.create_button",
              onClick: () => navigate({ to: "/kelola/tim/$id", params: { id: "baru" } }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4", "aria-hidden": "true" }),
                "Tim Baru"
              ]
            }
          )
        ] }),
        teamsPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "loading_state", className: "space-y-2", children: Array.from({ length: 4 }, (_, i) => `team-skeleton-${i}`).map(
          (id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, id)
        ) }) : (teams ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: Users,
            title: "Belum ada tim",
            description: "Buat tim pertama untuk mulai mengelola roster pemain.",
            action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                "data-ocid": "team.empty_add_button",
                onClick: () => navigate({ to: "/kelola/tim/$id", params: { id: "baru" } }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4", "aria-hidden": "true" }),
                  "Tim Baru"
                ]
              }
            )
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "team.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nama" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Game" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Roster" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Turnamen" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Aksi" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: (teams ?? []).map((team, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              "data-ocid": `team.row.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: team.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: team.game }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-muted-foreground", children: [
                  team.roster.length,
                  " pemain"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-muted-foreground", children: [
                  team.tournamentIds.length,
                  " turnamen"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      "data-ocid": `team.edit_button.${index + 1}`,
                      "aria-label": `Ubah ${team.name}`,
                      onClick: () => navigate({
                        to: "/kelola/tim/$id",
                        params: { id: team.id.toString() }
                      }),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4", "aria-hidden": "true" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      "data-ocid": `team.delete_button.${index + 1}`,
                      "aria-label": `Hapus ${team.name}`,
                      onClick: () => setPendingDelete({
                        kind: "tim",
                        id: team.id,
                        name: team.name
                      }),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4", "aria-hidden": "true" })
                    }
                  )
                ] }) })
              ]
            },
            team.id.toString()
          )) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pertandingan", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatchesPanel, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: pendingDelete !== null,
        onOpenChange: (open) => {
          if (!open) setPendingDelete(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "manage.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "font-display", children: [
              "Hapus ",
              (pendingDelete == null ? void 0 : pendingDelete.kind) === "tim" ? "tim" : "turnamen",
              "?"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              pendingDelete == null ? void 0 : pendingDelete.name,
              " akan dihapus permanen. Tindakan ini tidak dapat dibatalkan."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "manage.cancel_button", children: "Batal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                "data-ocid": "manage.confirm_button",
                onClick: () => {
                  if (!pendingDelete) return;
                  if (pendingDelete.kind === "turnamen") {
                    deleteTournament.mutate(pendingDelete.id, {
                      onSuccess: () => ue.success("Turnamen dihapus"),
                      onError: () => ue.error("Gagal menghapus turnamen")
                    });
                  } else {
                    deleteTeam.mutate(pendingDelete.id, {
                      onSuccess: () => ue.success("Tim dihapus"),
                      onError: () => ue.error("Gagal menghapus tim")
                    });
                  }
                },
                children: "Hapus"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Manage as default
};
