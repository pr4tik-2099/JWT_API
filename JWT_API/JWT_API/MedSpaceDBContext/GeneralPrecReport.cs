using System;
using System.Collections.Generic;

namespace JWT_API.MedSpaceDBContext;

public partial class GeneralPrecReport
{
    public int ReportId { get; set; }

    public string? FullName { get; set; }

    public string? UserName { get; set; }

    public string? LabName { get; set; }

    public string? Descr { get; set; }

    public string? DrName { get; set; }

    public DateOnly? RpDate { get; set; }

    public string? ImgLink { get; set; }
}
