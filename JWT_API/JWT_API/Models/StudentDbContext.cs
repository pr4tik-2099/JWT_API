using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace JWT_API.Models;

public partial class StudentDbContext : DbContext
{
    public StudentDbContext()
    {
    }

    public StudentDbContext(DbContextOptions<StudentDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Mark> Marks { get; set; }

    public virtual DbSet<StLogin> StLogins { get; set; }

    public virtual DbSet<Svu> Svus { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:dbcs");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Mark>(entity =>
        {
            entity.HasKey(e => e.RollNo).HasName("PK__marks__28B56405F1AF8285");

            entity.ToTable("marks");

            entity.Property(e => e.RollNo)
                .ValueGeneratedNever()
                .HasColumnName("Roll_no");
            entity.Property(e => e.Marks).HasColumnName("marks");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .IsUnicode(false);
        });

        modelBuilder.Entity<StLogin>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("st_login");

            entity.Property(e => e.Password)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        modelBuilder.Entity<Svu>(entity =>
        {
            entity.HasKey(e => e.StId).HasName("PK__svu__A85E81CF5BF0DC8C");

            entity.ToTable("svu");

            entity.Property(e => e.StId)
                .ValueGeneratedNever()
                .HasColumnName("st_id");
            entity.Property(e => e.StName)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("st_Name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__B9BF3327ECAF95A2");

            entity.Property(e => e.UserId)
                .ValueGeneratedOnAdd()
                .HasColumnName("user_Id");
            entity.Property(e => e.Password)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.UserName)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("user_Name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
