using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OfficeOpenXml;

namespace ParseExcelToChapters
{
    static class ExelParserHelper
    {
    public static string getTextFromColumn(ExcelWorksheet sheet, List<ExcelRangeBase> headers, int pageIndex, string columnName)
        {
            ExcelRangeBase head = headers.FirstOrDefault(i => i.Text == columnName);
            if (head != null)
            {
                int column = head.Start.Column;
                return sheet.Cells[pageIndex, column].Text;
            }
            return null;
        }
    }
}
