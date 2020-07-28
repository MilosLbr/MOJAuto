using Microsoft.EntityFrameworkCore.Migrations;

namespace MOJAuto.Data.Migrations
{
    public partial class CreateRelationshipCarRegistrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CarId",
                table: "Registrations",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateIndex(
                name: "IX_Registrations_CarId",
                table: "Registrations",
                column: "CarId");

            migrationBuilder.AddForeignKey(
                name: "FK_Registrations_Cars_CarId",
                table: "Registrations",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Registrations_Cars_CarId",
                table: "Registrations");

            migrationBuilder.DropIndex(
                name: "IX_Registrations_CarId",
                table: "Registrations");

            migrationBuilder.DropColumn(
                name: "CarId",
                table: "Registrations");
        }
    }
}
