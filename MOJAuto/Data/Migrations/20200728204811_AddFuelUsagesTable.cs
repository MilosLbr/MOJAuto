using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MOJAuto.Data.Migrations
{
    public partial class AddFuelUsagesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Kilometrage",
                table: "Registrations",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<long>(
                name: "Kilometrage",
                table: "Cars",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.CreateTable(
                name: "FuelUsages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateFilled = table.Column<DateTime>(nullable: false),
                    Price = table.Column<int>(nullable: false),
                    Kilometrage = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FuelUsages", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FuelUsages");

            migrationBuilder.AlterColumn<double>(
                name: "Kilometrage",
                table: "Registrations",
                type: "float",
                nullable: false,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<double>(
                name: "Kilometrage",
                table: "Cars",
                type: "float",
                nullable: false,
                oldClrType: typeof(long));
        }
    }
}
