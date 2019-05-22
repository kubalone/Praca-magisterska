using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CRS.Data.Entities;
using CRS.Data.Users;
using CRS.Data.Users.AplicationSetting;
using CRS.Repository.Data;

using CRS.Service.Infrastructure;
using CRS.Service.Infrastructure.AutoMapper;
using CRS.Service.Interfaces;
using CRS.Service.Services;
using CRS.Web.Exceptions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace CRS.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<JWTSettings>(Configuration.GetSection("JWTSettings"));

            services.Configure<AuthMessageSenderOptions>(Configuration.GetSection("AuthMessageSenderOptions"));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddAutoMapper(typeof(AutoMapperConfiguration));

            services.AddIdentity<ApplicationUser, ApplicationRole>(options => options.Stores.MaxLengthForKeys = 128)
             .AddEntityFrameworkStores<CRSDbContext>()
             .AddDefaultTokenProviders();

       
            //var appSettingsSection = Configuration.GetSection("AppSettings");
            //services.Configure<AppSettings>(appSettingsSection);

            services.AddDbContext<CRSDbContext>(options =>
               options.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=CarRepairSystemDB;Trusted_Connection=True;"));
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IEmailSender, EmailSender>();

            //services.AddTransient<ITypeOfCustomerService, TypeOfCustomerService>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 4;
            });
            services.AddCors();
            var key = Encoding.UTF8.GetBytes(Configuration["JWTSettings:JWT_Secret"].ToString());
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });

        }
         

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, CRSDbContext context, RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(bulider => bulider.WithOrigins(Configuration["JWTSettings:Client_URL"].ToString())
            .AllowAnyMethod()
            .AllowAnyHeader());

            app.UseHttpsRedirection();
            Initializer.InitializeUser(context, userManager, roleManager).Wait();
            Initializer.InitializeTypeOfCustomer(context).Wait();


            app.UseAuthentication();
            app.UseMiddleware(typeof(ErrorHandlingMiddleware));
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
