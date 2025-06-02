import * as clack from "@clack/prompts";
import colors from "picocolors";

export const getChoiceSummary = (userChoice) => {
  const summaryLines = [
    `  Project Name:     ${colors.green(userChoice.projectName)}`,
    `  Framework:        ${colors.green(userChoice.framework)}`,
  ];
  if (userChoice.routing) {
    summaryLines.push(
      `  Routing Library:  ${colors.green(userChoice.routing)}`
    );
  }
  summaryLines.push(
    `  State Management: ${colors.green(userChoice.stateManagement)}`
  );
  summaryLines.push(
    `  Color Theme:      ${colors.green(userChoice.colorPalette)}`
  );

  clack.note(summaryLines.join("\n"), "You've selected the following options:");
};
