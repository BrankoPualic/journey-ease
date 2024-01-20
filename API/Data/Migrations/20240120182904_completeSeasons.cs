using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class completeSeasons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EndDate",
                table: "Seasons",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StartDate",
                table: "Seasons",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Seasons");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Seasons");
        }
    }
}
