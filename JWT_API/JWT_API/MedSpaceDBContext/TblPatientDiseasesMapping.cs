using System;
using System.Collections.Generic;

namespace JWT_API.MedSpaceDBContext;

public partial class TblPatientDiseasesMapping
{
    public int MappingId { get; set; }

    public int? UserId { get; set; }

    public int? DiseaseId { get; set; }
}
