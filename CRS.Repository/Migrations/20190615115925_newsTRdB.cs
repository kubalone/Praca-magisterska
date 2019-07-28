using Microsoft.EntityFrameworkCore.Migrations;

namespace CRS.Repository.Migrations
{
    public partial class newsTRdB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "Vehicle",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Colour",
                table: "Vehicle",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DisplacementCapacity",
                table: "Vehicle",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Fuel",
                table: "Vehicle",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MileAge",
                table: "Vehicle",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Model",
                table: "Vehicle",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModelYear",
                table: "Vehicle",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Power",
                table: "Vehicle",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Registration",
                table: "Vehicle",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VIN",
                table: "Vehicle",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Brand",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Colour",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "DisplacementCapacity",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Fuel",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "MileAge",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Model",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "ModelYear",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Power",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Registration",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "VIN",
                table: "Vehicle");
        }
    }
}
