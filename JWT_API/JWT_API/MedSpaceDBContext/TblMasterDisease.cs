using System;
using System.Collections.Generic;

namespace JWT_API.MedSpaceDBContext;

public partial class TblMasterDisease
{
    public int DiseaseId { get; set; }

    public string? DiseaseName { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsDeleted { get; set; }
}
