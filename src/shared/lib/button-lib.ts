import { ButtonProps } from "@/shared/types/ui";

export function getVariantClasses(variant: ButtonProps["variant"]) {
  switch (variant) {
    case "primary":
      return "bg-primary text-primary-foreground hover:bg-primary-hover ";
    case "secondary":
      return "bg-secondary text-secondary-foreground hover:bg-secondary-hover ";
    case "outline":
      return "border border-border bg-transparent text-primary hover:opacity-90";
    default:
      return "bg-primary text-primary-foreground";
  }
}

export function getRingClasses(variant: ButtonProps["variant"]) {
  switch (variant) {
    case "primary":
      return "focus-visible:ring-primary active:ring-primary/30";
    case "secondary":
      return "focus-visible:ring-secondary active:ring-secondary/30";
    case "outline":
      return "focus-visible:ring-border active:ring-border/50";
    default:
      return "focus-visible:ring-primary active:ring-primary/30";
  }
}
