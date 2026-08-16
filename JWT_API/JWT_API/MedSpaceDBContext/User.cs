using System;
using System.Collections.Generic;

namespace JWT_API.MedSpaceDBContext;

public partial class User
{
    public string UserId { get; set; } = null!;

    public string? UserName { get; set; }

    public string? UserPassword { get; set; }
}
