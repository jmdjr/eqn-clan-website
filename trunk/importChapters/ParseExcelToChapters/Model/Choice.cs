//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ParseExcelToChapters.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class Choice
    {
        public int ChoiceId { get; set; }
        public string DisplayText { get; set; }
        public int TargetPageId { get; set; }
        public int SourcePageId { get; set; }
    
        public virtual Page Page { get; set; }
        public virtual Page Page1 { get; set; }
    }
}
