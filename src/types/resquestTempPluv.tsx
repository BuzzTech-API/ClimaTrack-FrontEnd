export interface TempPluvData {
  message: string;
  status: string;
  data: {
    day: string;
    temperature: number;
    precipitation: number;
  }[];
}
