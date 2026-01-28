using System;
using System.Collections.Generic;

namespace JWT_API.Models;

public partial class StLogin
{
    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;
}
