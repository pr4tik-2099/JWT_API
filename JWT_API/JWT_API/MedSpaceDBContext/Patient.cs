using System;
using System.Collections.Generic;

namespace JWT_API.MedSpaceDBContext;

public partial class Patient
{
    public double? PatientId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Gender { get; set; }

    public double? Age { get; set; }

    public string? States { get; set; }

    public string? Allergies { get; set; }

    public double? Weight { get; set; }

    public double? Height { get; set; }

    public double? Bmi { get; set; }

    public bool Smoke { get; set; }

    public double? Glucose { get; set; }

    public double? BloodPressure { get; set; }

    public string? ChestPain { get; set; }

    public double? Cholesterol { get; set; }

    public string? Diabetes { get; set; }

    public double? Platelets { get; set; }

    public double? Hemoglobin { get; set; }

    public string? F19 { get; set; }
}
