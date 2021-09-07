import { Logger } from "tslog";

export const log = new Logger({
  name: "Flapi",
  colorizePrettyLogs: true,
  displayFunctionName: false,
  displayFilePath: false
});
