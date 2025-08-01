export interface IFileItem {
  id: string;
  file: File;
  originalUrl: string;
  convertedUrl?: string;
  outputFormat: string;
  status: "pending" | "converting" | "completed" | "error";
}
