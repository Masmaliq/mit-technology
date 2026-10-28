import type { CSSProperties } from "react";

const styles = {
  root: { display: "grid", gap: 1, minWidth: 0, lineHeight: 1.1 },
  brand: { color: "#002832", fontSize: 13, fontWeight: 750, letterSpacing: "0.09em", whiteSpace: "nowrap" },
  accent: { color: "#0788C9" },
  descriptor: { color: "#6E7C83", fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", whiteSpace: "nowrap" },
} satisfies Record<string, CSSProperties>;

export function MitStudioLogo() {
  return (
    <div aria-label="Emitech Studio Content Management System" style={styles.root}>
      <span style={styles.brand}>EMITECH <span aria-hidden="true" style={styles.accent}>{"·"}</span> STUDIO</span>
      <span style={styles.descriptor}>CONTENT MANAGEMENT SYSTEM</span>
    </div>
  );
}
