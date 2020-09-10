using Microsoft.EntityFrameworkCore.Migrations;

namespace MOJAuto.Data.Migrations
{
    public partial class AddPriceColumnToServices : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Services",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Services");
        }
    }
}
