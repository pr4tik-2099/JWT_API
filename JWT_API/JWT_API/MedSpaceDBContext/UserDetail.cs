using System;
using System.Collections.Generic;

namespace JWT_API.MedSpaceDBContext;

public partial class UserDetail
{
    public long UserId { get; set; }

    public string FullName { get; set; } = null!;

    public string EmailId { get; set; } = null!;

    public DateOnly BirthDate { get; set; }

    public string Gender { get; set; } = null!;

    public long ContactNumber { get; set; }

    public string State { get; set; } = null!;

    public string City { get; set; } = null!;

    public string Pincode { get; set; } = null!;

    public string UserAddress { get; set; } = null!;

    public int? Age { get; set; }

    public int? Height { get; set; }

    public int? Weight { get; set; }

    public bool? Hypertension { get; set; }

    public bool? Diabetes { get; set; }

    public bool? Smoking { get; set; }

    public string UserName { get; set; } = null!;

    public string UserPassword { get; set; } = null!;
}
