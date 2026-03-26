export type ComponentType =
  | "section"
  | "row"
  | "column"
  | "heading"
  | "paragraph"
  | "button"
  | "image"
  | "video"
  | "divider"
  | "hero"
  | "feature-grid"
  | "pricing"
  | "testimonials"
  | "logo-cloud"
  | "faq"
  | "cta"
  | "contact-form"
  | "card";

export interface BuilderComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  children?: BuilderComponent[];
  width?: number; // 1-12 for columns, percentage for others
  height?: number; // pixels for components
  // Styling properties
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  padding?: number;
  margin?: number;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  // Unit tracking for sizing
  widthUnit?: "%" | "px";
  heightUnit?: "px";
  fontSizeUnit?: "px" | "%";
}

export const DRAG_TYPES = {
  COMPONENT: "COMPONENT",
  LAYOUT: "LAYOUT",
};
