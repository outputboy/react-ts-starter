export interface ExcelRow {
  [index: string]: string;
}

export interface ExcelDictionary {
  [index: string]: Array<ExcelRow>;
}
