using Microsoft.EntityFrameworkCore.Migrations;

namespace MOJAuto.Data.Migrations
{
    public partial class CreateCarsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Model = table.Column<string>(nullable: true),
                    Kilometrage = table.Column<double>(nullable: false),
                    ManufactureYear = table.Column<int>(nullable: false),
                    EngineCubicCapacity = table.Column<int>(nullable: false),
                    EnginePowerKW = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cars");
        }
    }
}
