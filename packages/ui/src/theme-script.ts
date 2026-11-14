/** localStorage key for an explicit theme choice. Absent = follow the system. */
export const THEME_KEY = "fz-theme";

/**
 * Inline <head> script: applies a saved theme before first paint (no flash).
 * Without a saved choice it does nothing and tokens.css follows prefers-color-scheme.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
