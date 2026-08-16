using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace JWT_API.MedSpaceDBContext;

public partial class MedSpaceReportContext : DbContext
{
    public MedSpaceReportContext()
    {
    }

    public MedSpaceReportContext(DbContextOptions<MedSpaceReportContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BloodPressureReport> BloodPressureReports { get; set; }

    public virtual DbSet<BloodSugarReport> BloodSugarReports { get; set; }

    public virtual DbSet<GeneralPrecReport> GeneralPrecReports { get; set; }

    public virtual DbSet<Patient> Patients { get; set; }

    public virtual DbSet<TblMasterDisease> TblMasterDiseases { get; set; }

    public virtual DbSet<TblPatientDiseasesMapping> TblPatientDiseasesMappings { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserDetail> UserDetails { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:MedSpaceConnectionString");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BloodPressureReport>(entity =>
        {
            entity.HasKey(e => e.ReportId).HasName("PK__Blood_Pr__779E6810E02B8064");

            entity.ToTable("Blood_Pressure_Reports");

            entity.Property(e => e.ReportId).HasColumnName("report_Id");
            entity.Property(e => e.BpHg).HasColumnName("BP_hg");
            entity.Property(e => e.BpMm).HasColumnName("BP_mm");
            entity.Property(e => e.FullName)
                .HasMaxLength(250)
                .HasColumnName("full_Name");
            entity.Property(e => e.ImgLink)
                .HasMaxLength(1000)
                .HasColumnName("img_link");
            entity.Property(e => e.LabName)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("labName");
            entity.Property(e => e.RpDate).HasColumnName("Rp_Date");
            entity.Property(e => e.UserName)
                .HasMaxLength(250)
                .HasColumnName("userName");
        });

        modelBuilder.Entity<BloodSugarReport>(entity =>
        {
            entity.HasKey(e => e.ReportId).HasName("PK__Blood_Su__779E6810A8F5118D");

            entity.ToTable("Blood_Sugar_Reports");

            entity.Property(e => e.ReportId).HasColumnName("report_Id");
            entity.Property(e => e.BsLvl).HasColumnName("BS_lvl");
            entity.Property(e => e.FullName)
                .HasMaxLength(250)
                .HasColumnName("full_Name");
            entity.Property(e => e.ImgLink)
                .HasMaxLength(1000)
                .HasColumnName("img_Link");
            entity.Property(e => e.LabName)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("labName");
            entity.Property(e => e.RpDate).HasColumnName("Rp_Date");
            entity.Property(e => e.UserName)
                .HasMaxLength(200)
                .HasColumnName("userName");
        });

        modelBuilder.Entity<GeneralPrecReport>(entity =>
        {
            entity.HasKey(e => e.ReportId).HasName("PK__General___779B7C587A1FCF89");

            entity.ToTable("General_Prec_Reports");

            entity.Property(e => e.ReportId).HasColumnName("report_id");
            entity.Property(e => e.Descr)
                .HasMaxLength(2000)
                .IsUnicode(false)
                .HasColumnName("descr");
            entity.Property(e => e.DrName)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("drName");
            entity.Property(e => e.FullName)
                .HasMaxLength(250)
                .HasColumnName("full_Name");
            entity.Property(e => e.ImgLink)
                .HasMaxLength(1000)
                .HasColumnName("img_link");
            entity.Property(e => e.LabName)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("labName");
            entity.Property(e => e.RpDate).HasColumnName("Rp_Date");
            entity.Property(e => e.UserName)
                .HasMaxLength(250)
                .HasColumnName("userName");
        });

        modelBuilder.Entity<Patient>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("patient$");

            entity.Property(e => e.Allergies).HasMaxLength(255);
            entity.Property(e => e.Bmi).HasColumnName("BMI");
            entity.Property(e => e.ChestPain).HasMaxLength(255);
            entity.Property(e => e.Diabetes).HasMaxLength(255);
            entity.Property(e => e.F19).HasMaxLength(255);
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .HasColumnName("First_name");
            entity.Property(e => e.Gender).HasMaxLength(255);
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .HasColumnName("Last_name");
            entity.Property(e => e.PatientId).HasColumnName("Patient_id");
            entity.Property(e => e.States).HasMaxLength(255);
        });

        modelBuilder.Entity<TblMasterDisease>(entity =>
        {
            entity.HasKey(e => e.DiseaseId).HasName("PK__tbl_mast__15627065C8F664A7");

            entity.ToTable("tbl_master_diseases");

            entity.Property(e => e.DiseaseId).HasColumnName("disease_id");
            entity.Property(e => e.DiseaseName)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("disease_name");
        });

        modelBuilder.Entity<TblPatientDiseasesMapping>(entity =>
        {
            entity.HasKey(e => e.MappingId).HasName("PK__tbl_pati__5AE90045BF5AD94D");

            entity.ToTable("tbl_patient_diseases_mapping");

            entity.Property(e => e.MappingId).HasColumnName("mapping_id");
            entity.Property(e => e.DiseaseId).HasColumnName("disease_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__B9BF3327D7A9E82A");

            entity.Property(e => e.UserId)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("user_Id");
            entity.Property(e => e.UserName)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("user_Name");
            entity.Property(e => e.UserPassword)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("user_password");
        });

        modelBuilder.Entity<UserDetail>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__user_Det__B9BF332701FB4470");

            entity.ToTable("user_Details");

            entity.Property(e => e.UserId).HasColumnName("user_Id");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.BirthDate).HasColumnName("birth_Date");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("city");
            entity.Property(e => e.ContactNumber).HasColumnName("contact_Number");
            entity.Property(e => e.Diabetes).HasColumnName("diabetes");
            entity.Property(e => e.EmailId)
                .HasMaxLength(200)
                .HasColumnName("email_Id");
            entity.Property(e => e.FullName)
                .HasMaxLength(200)
                .HasColumnName("full_Name");
            entity.Property(e => e.Gender)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("gender");
            entity.Property(e => e.Height).HasColumnName("height");
            entity.Property(e => e.Hypertension).HasColumnName("hypertension");
            entity.Property(e => e.Pincode)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("pincode");
            entity.Property(e => e.Smoking).HasColumnName("smoking");
            entity.Property(e => e.State)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("state");
            entity.Property(e => e.UserAddress)
                .HasMaxLength(500)
                .HasColumnName("user_Address");
            entity.Property(e => e.UserName)
                .HasMaxLength(100)
                .HasColumnName("user_Name");
            entity.Property(e => e.UserPassword)
                .HasMaxLength(100)
                .HasColumnName("user_password");
            entity.Property(e => e.Weight).HasColumnName("weight");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
