using Microsoft.EntityFrameworkCore.Migrations;

namespace MOJAuto.Data.Migrations
{
    public partial class AddNewColumnsToFuelUsages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GasStationName",
                table: "FuelUsages",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LitersFilled",
                table: "FuelUsages",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GasStationName",
                table: "FuelUsages");

            migrationBuilder.DropColumn(
                name: "LitersFilled",
                table: "FuelUsages");
        }
    }
}
