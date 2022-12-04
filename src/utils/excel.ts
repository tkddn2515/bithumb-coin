import xlsx from 'xlsx';

export const readExcel = (excel, index = 0) => {
  // const excelFile = xlsx.readFile(excel);
  // read Date
  const excelFile = xlsx.readFile(excel, { type: 'binary', cellDates: true, dateNF: 'yyyy-mm-dd' });

  const sheetName = excelFile.SheetNames[index];
  const sheet = excelFile.Sheets[sheetName];

  const jsonData = xlsx.utils.sheet_to_json( sheet, { defval : "" } );

  return jsonData;
}

export const writeExcel = (path, jsonData, sheet = "") => {

  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(jsonData);

  xlsx.utils.book_append_sheet(workbook, worksheet, sheet != "" ? sheet : 'sheet1');
  xlsx.writeFile(workbook, path);
}

/**
 * 
 * @param {String} path 
 * @param {Object[]} jsonDatas 
 * @param {String[]} sheets
 * @version 0.0.1
 */
export const writesExcel = (path, jsonDatas) => {
  const workbook = xlsx.utils.book_new();
  for(let i =0; i < jsonDatas.length; i ++) {
    const worksheet = xlsx.utils.json_to_sheet(jsonDatas[i]);
    // xlsx.utils.book_append_sheet(workbook, worksheet, i < sheets.length ? sheets[i] : `sheet${i}`);
    xlsx.utils.book_append_sheet(workbook, worksheet, `sheet${i}`);
  }
  xlsx.writeFile(workbook, path);
}