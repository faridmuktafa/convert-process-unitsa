import React, { useState, useEffect } from "react";
import { Moon, Sun, Copy, RotateCcw, Settings2, Check, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { categories } from "./conversions";
import Auth from "./Auth";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="p-2 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-700"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check size={16} className="text-emerald-500" />
      ) : (
        <Copy size={16} />
      )}
    </button>
  );
};

function formatValue(
  val: number,
  precision: number,
  scientific: boolean,
): string {
  if (val === 0) return "0";
  if (!isFinite(val)) return "";

  if (scientific) {
    return val.toExponential(precision);
  }

  if (Math.abs(val) >= 1e10 || Math.abs(val) <= 1e-7) {
    return val.toExponential(precision);
  }

  let str = val.toFixed(precision);
  if (str.includes(".")) {
    str = str.replace(/0+$/, "").replace(/\.$/, "");
  }
  return str;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState(categories[0].id);
  const [categoryStates, setCategoryStates] = useState<
    Record<
      string,
      {
        baseValue: number | null;
        lastEditedUnit: string | null;
        rawInput: string;
      }
    >
  >({});
  const [precision, setPrecision] = useState(4);
  const [scientific, setScientific] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Check system preference on mount
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleReset = () => {
    setCategoryStates((prev) => ({
      ...prev,
      [activeTab]: { baseValue: null, lastEditedUnit: null, rawInput: "" },
    }));
  };

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-zinc-950">
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-slate-100 dark:from-zinc-900 dark:to-zinc-950 text-slate-900 dark:text-zinc-100 font-sans selection:bg-indigo-500/30">
        {/* Header */}
        <header className="max-w-6xl mx-auto pt-12 pb-8 px-6 text-center relative">
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md border border-slate-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all"
            >
              {darkMode ? (
                <Sun size={20} className="text-amber-400" />
              ) : (
                <Moon size={20} className="text-indigo-500" />
              )}
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-3 rounded-full bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md border border-slate-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all text-slate-500 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-3"
          >
            Process Engineering Universal Converter
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-1"
          >
            <p className="text-slate-500 dark:text-zinc-400 font-medium">
              Professional-Grade Engineering Unit Conversion Tool
            </p>
            <p className="text-sm text-slate-400 dark:text-zinc-500">
              by Mohammad Farid Muktafa
            </p>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 pb-20">
          <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/40 dark:border-zinc-800/50 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 rounded-3xl overflow-hidden">
            {/* Tabs */}
            <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200/50 dark:border-zinc-800/50 bg-white/30 dark:bg-zinc-900/30 px-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`whitespace-nowrap px-5 py-3 text-sm font-medium rounded-t-xl transition-all relative ${
                    activeTab === cat.id
                      ? "text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-zinc-800/80 shadow-sm"
                      : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 hover:bg-white/40 dark:hover:bg-zinc-800/40"
                  }`}
                >
                  {cat.label}
                  {activeTab === cat.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 dark:bg-indigo-400"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-slate-100 dark:border-zinc-800/50 bg-white/20 dark:bg-zinc-900/20">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Settings2 size={16} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-600 dark:text-zinc-300">
                    Precision
                  </span>
                  <select
                    value={precision}
                    onChange={(e) => setPrecision(Number(e.target.value))}
                    className="bg-transparent border border-slate-200 dark:border-zinc-700 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:bg-zinc-800 cursor-pointer"
                  >
                    {[2, 3, 4, 5, 6].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={scientific}
                      onChange={() => setScientific(!scientific)}
                    />
                    <div
                      className={`w-9 h-5 rounded-full transition-colors ${scientific ? "bg-indigo-500" : "bg-slate-300 dark:bg-zinc-700"}`}
                    ></div>
                    <div
                      className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${scientific ? "translate-x-4" : "translate-x-0"}`}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-zinc-300 group-hover:text-slate-900 dark:group-hover:text-zinc-100 transition-colors">
                    Scientific Notation
                  </span>
                </label>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>

            {/* Conversion Grid */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                >
                  {categories
                    .find((c) => c.id === activeTab)
                    ?.units.map((unit) => {
                      const state = categoryStates[activeTab];
                      let displayValue = "";
                      if (state) {
                        if (state.lastEditedUnit === unit.id) {
                          displayValue = state.rawInput;
                        } else if (state.baseValue !== null) {
                          const converted = unit.fromBase(state.baseValue);
                          displayValue = formatValue(
                            converted,
                            precision,
                            scientific,
                          );
                        }
                      }

                      return (
                        <div
                          key={unit.id}
                          className="group relative bg-white dark:bg-zinc-800/50 rounded-2xl border border-slate-200/60 dark:border-zinc-700/50 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
                          <div className="px-4 py-3 flex justify-between items-center border-b border-slate-100 dark:border-zinc-700/50">
                            <label
                              htmlFor={unit.id}
                              className="text-sm font-semibold text-slate-700 dark:text-zinc-300"
                            >
                              {unit.label}
                            </label>
                            <CopyButton text={displayValue} />
                          </div>
                          <div className="p-4">
                            <input
                              id={unit.id}
                              type="text"
                              inputMode="decimal"
                              value={displayValue}
                              onChange={(e) => {
                                let val = e.target.value;
                                val = val.replace(",", "."); // Handle international decimal

                                if (val === "" || val === "-" || val === "+") {
                                  setCategoryStates((prev) => ({
                                    ...prev,
                                    [activeTab]: {
                                      baseValue: null,
                                      lastEditedUnit: unit.id,
                                      rawInput: val,
                                    },
                                  }));
                                  return;
                                }

                                const num = parseFloat(val);
                                if (!isNaN(num)) {
                                  setCategoryStates((prev) => ({
                                    ...prev,
                                    [activeTab]: {
                                      baseValue: unit.toBase(num),
                                      lastEditedUnit: unit.id,
                                      rawInput: val,
                                    },
                                  }));
                                } else if (val.toLowerCase().includes("e")) {
                                  setCategoryStates((prev) => ({
                                    ...prev,
                                    [activeTab]: {
                                      baseValue: null,
                                      lastEditedUnit: unit.id,
                                      rawInput: val,
                                    },
                                  }));
                                }
                              }}
                              className="w-full bg-transparent text-2xl md:text-3xl font-mono text-slate-900 dark:text-zinc-100 focus:outline-none placeholder-slate-300 dark:placeholder-zinc-600"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      );
                    })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
