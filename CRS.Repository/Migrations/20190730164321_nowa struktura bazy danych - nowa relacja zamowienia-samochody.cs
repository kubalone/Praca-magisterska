using Microsoft.EntityFrameworkCore.Migrations;

namespace CRS.Repository.Migrations
{
    public partial class nowastrukturabazydanychnowarelacjazamowieniasamochody : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Customer_CustomerID",
                table: "Order");

            migrationBuilder.DropTable(
                name: "OrderVehicle");

            migrationBuilder.AlterColumn<int>(
                name: "CustomerID",
                table: "Order",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RepairDetails",
                table: "Order",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TypeOfNotification",
                table: "Order",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VehicleId",
                table: "Order",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Order_VehicleId",
                table: "Order",
                column: "VehicleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Customer_CustomerID",
                table: "Order",
                column: "CustomerID",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Vehicle_VehicleId",
                table: "Order",
                column: "VehicleId",
                principalTable: "Vehicle",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Customer_CustomerID",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_Vehicle_VehicleId",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_Order_VehicleId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "RepairDetails",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "TypeOfNotification",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "VehicleId",
                table: "Order");

            migrationBuilder.AlterColumn<int>(
                name: "CustomerID",
                table: "Order",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateTable(
                name: "OrderVehicle",
                columns: table => new
                {
                    OrderID = table.Column<int>(nullable: false),
                    VehicleID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderVehicle", x => new { x.OrderID, x.VehicleID });
                    table.ForeignKey(
                        name: "FK_OrderVehicle_Order_OrderID",
                        column: x => x.OrderID,
                        principalTable: "Order",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderVehicle_Vehicle_VehicleID",
                        column: x => x.VehicleID,
                        principalTable: "Vehicle",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderVehicle_VehicleID",
                table: "OrderVehicle",
                column: "VehicleID");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Customer_CustomerID",
                table: "Order",
                column: "CustomerID",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
