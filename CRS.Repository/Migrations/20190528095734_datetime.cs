using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CRS.Repository.Migrations
{
    public partial class datetime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customer_TypeofCustomer_TypeOfCustomerID",
                table: "Customer");

            migrationBuilder.AlterColumn<int>(
                name: "TypeOfCustomerID",
                table: "Customer",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTimeAddCustomer",
                table: "Customer",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_Customer_TypeofCustomer_TypeOfCustomerID",
                table: "Customer",
                column: "TypeOfCustomerID",
                principalTable: "TypeofCustomer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customer_TypeofCustomer_TypeOfCustomerID",
                table: "Customer");

            migrationBuilder.DropColumn(
                name: "DateTimeAddCustomer",
                table: "Customer");

            migrationBuilder.AlterColumn<int>(
                name: "TypeOfCustomerID",
                table: "Customer",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Customer_TypeofCustomer_TypeOfCustomerID",
                table: "Customer",
                column: "TypeOfCustomerID",
                principalTable: "TypeofCustomer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
