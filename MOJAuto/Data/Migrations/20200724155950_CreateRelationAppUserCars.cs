using Microsoft.EntityFrameworkCore.Migrations;

namespace MOJAuto.Data.Migrations
{
    public partial class CreateRelationAppUserCars : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Cars",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_Cars_ApplicationUserId",
                table: "Cars",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_AspNetUsers_ApplicationUserId",
                table: "Cars",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_AspNetUsers_ApplicationUserId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_ApplicationUserId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Cars");
        }
    }
}
