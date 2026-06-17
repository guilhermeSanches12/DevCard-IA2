import { StyleSheet } from "react-native";
import { THEME } from "../../styles/contants";

export const styles = StyleSheet.create({
  formGroup: {
    flexDirection: "column",
    gap: 8,
  },
  formLabel: {
    color: THEME.colors.heading,
    fontWeight: "bold",
  },
  formInput: {
    borderRadius: THEME.border.radius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border.input,
    backgroundColor: THEME.colors.primary_foreground,
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  formValue: {
    color: THEME.colors.heading,
    fontSize: 14,
  },
  formPlaceholder: {
    color: THEME.colors.border.input,
  },
  arrow: {
    color: THEME.colors.subtitle,
    fontSize: 12,
  },
  formError: {
    color: THEME.colors.error,
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    backgroundColor: THEME.colors.primary_foreground,
    borderRadius: THEME.border.radius.lg,
    width: "85%",
    maxHeight: 350,
    paddingVertical: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionSelected: {
    backgroundColor: "#f0f2ff",
  },
  optionText: {
    color: THEME.colors.heading,
    fontSize: 15,
  },
  optionTextSelected: {
    color: THEME.colors.primary,
    fontWeight: "bold",
  },
});
