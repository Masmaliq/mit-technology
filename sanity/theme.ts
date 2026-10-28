import { buildLegacyTheme } from "sanity";

export const mitStudioTheme = buildLegacyTheme({
  "--black": "#15272B",
  "--white": "#FFFFFF",
  "--brand-primary": "#0788C9",
  "--component-bg": "#FFFFFF",
  "--component-text-color": "#15272B",
  "--focus-color": "#0788C9",
  "--gray-base": "#F5F7F6",
  "--gray": "#748489",
  "--main-navigation-color": "#FFFFFF",
  "--main-navigation-color--inverted": "#002B32",
  "--default-button-primary-color": "#0788C9",
  "--default-button-color": "#EEF2F4",
  "--default-button-success-color": "#16A34A",
  "--default-button-warning-color": "#9A6B0B",
  "--default-button-danger-color": "#DC2626",
  "--state-info-color": "#0788C9",
  "--state-success-color": "#16A34A",
  "--state-warning-color": "#9A6B0B",
  "--state-danger-color": "#DC2626",
  "--font-family-base":
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  "--font-family-monospace": '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
});
