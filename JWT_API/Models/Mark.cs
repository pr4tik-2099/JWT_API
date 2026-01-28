using System;
using System.Collections.Generic;

namespace JWT_API.Models;

public partial class Mark
{
    public string? Name { get; set; }

    public int RollNo { get; set; }

    public int? Marks { get; set; }
}
