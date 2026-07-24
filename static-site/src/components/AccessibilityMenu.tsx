import { useEffect, useRef, useState } from "react";
import { Accessibility, Moon, Monitor, Sun, Type, X } from "lucide-react";
import {
  applyA11ySettings,
  DEFAULT_A11Y_SETTINGS,
  loadA11ySettings,
  saveA11ySettings,
  type A11ySettings,
  type TextSize,
  type Theme,
} from "@/lib/a11y";
import { CARD } from "@/lib/ui";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const THEME_OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

const TEXT_SIZE_OPTIONS: { value: TextSize; label: string }[] = [
  { value: "normal", label: "A" },
  { value: "large", label: "A" },
  { value: "xl", label: "A" },
];

export function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT_A11Y_SETTINGS);
  const [ready, setReady] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSettings(loadA11ySettings());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyA11ySettings(settings);
    saveA11ySettings(settings);
  }, [settings, ready]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const update = <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
    setSettings((s) => ({ ...s, [key]: value }));
  };

  return (
    <div className="fixed right-4 top-4 z-50" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Accessibility and display options"
        aria-expanded={open}
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-secondary ${FOCUS_RING}`}
      >
        <Accessibility className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Display settings"
          className={`absolute right-0 top-14 w-72 p-4 ${CARD}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Display settings</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className={`flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground ${FOCUS_RING}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4">
            <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Theme
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => update("theme", value)}
                  aria-pressed={settings.theme === value}
                  className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-xs font-medium transition-colors ${FOCUS_RING} ${
                    settings.theme === value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <Type className="h-3 w-3" /> Text size
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {TEXT_SIZE_OPTIONS.map(({ value, label }, i) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => update("textSize", value)}
                  aria-pressed={settings.textSize === value}
                  className={`flex items-center justify-center rounded-xl border py-2.5 font-semibold transition-colors ${FOCUS_RING} ${
                    settings.textSize === value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-secondary"
                  }`}
                  style={{ fontSize: 13 + i * 3 }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <ToggleRow
              label="Reduce motion"
              description="Turns off animations and transitions"
              checked={settings.reduceMotion}
              onChange={(v) => update("reduceMotion", v)}
            />
            <ToggleRow
              label="High contrast"
              description="Stronger borders and text contrast"
              checked={settings.highContrast}
              onChange={(v) => update("highContrast", v)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2.5 text-left transition-colors hover:bg-secondary ${FOCUS_RING}`}
    >
      <span>
        <span className="block text-sm font-medium text-foreground">{label}</span>
        <span className="block text-xs text-muted-foreground">{description}</span>
      </span>
      <span
        className={`relative h-5 w-9 flex-none rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-border"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}
